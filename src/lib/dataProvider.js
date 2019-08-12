import {queryParameters, fetchJson} from "./fetch"
import { GET_LIST, GET_ONE, GET_MANY, GET_MANY_REFERENCE, CREATE, UPDATE, DELETE,} from "ra-core"
import config from "config"


function queryPagination(params) {
    const {page, perPage} = Object.assign({page: 0, perPage: 100}, params.pagination)
    return {
        limit: perPage,
        offset: page > 0 ? (page - 1) * perPage : 0
    }
}

function querySort(params) {
    const {field, order} = params.sort
    return field ? {order: `${field} ${order}`} : {}
}

const apiUrl = config.apiUrl
/**
 * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The REST request params, depending on the type
 * @returns {Object} { url, options } The HTTP request parameters
 */
const convertRESTRequestToHTTP = (type, resource, params) => {
    resource = resource.toLowerCase()
    let url = ""
    const options = {}
    switch (type) {
    case GET_LIST: {
        const query = {}
        Object.assign(query, queryPagination(params))
        Object.assign(query, querySort(params))
        Object.assign(query, params.filter)
        url = `${apiUrl}/${resource}?${queryParameters(query)}`
        break
    }
    case GET_ONE:
        url = `${apiUrl}/${resource}/${params.id}`
        break
    case GET_MANY: {
        const query = { ids: params.ids.join(",")}
        url = `${apiUrl}/${resource}?${queryParameters(query)}`
        break
    }
    case GET_MANY_REFERENCE: {
        const query = {}
        Object.assign(query, queryPagination(params))
        Object.assign(query, querySort(params))
        Object.assign(query, params.filter)
        query[params.target] = params.id
        url = `${apiUrl}/${resource}?${queryParameters(query)}`
        break
    }
    case UPDATE:
        url = `${apiUrl}/${resource}/${params.id}`
        options.method = "PATCH"
        options.body = JSON.stringify(params.data)
        break
    case CREATE:
        url = `${apiUrl}/${resource}`
        options.method = "POST"
        options.body = JSON.stringify(params.data)
        break
    case DELETE:
        url = `${apiUrl}/${resource}/${params.id}`
        options.method = "DELETE"
        break
    default:
        throw new Error(`Unsupported fetch action type ${type}`)
    }
    return {url, options}
}

/**
 * @param {Object} response HTTP response from fetch()
 * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The REST request params, depending on the type
 * @returns {Object} REST response
 */
const convertHTTPResponseToREST = (response, type/*, resource, params*/) => {
    //const {headers, json} = response;
    const {data, meta} = response.json
    switch (type) {
    case GET_LIST:
    case GET_MANY:
    case GET_MANY_REFERENCE:
        return {
            data: data.map(x => ({ ...x, id: x[meta.id] })),
            total: meta.total || data.length
        }
    case UPDATE:
    case DELETE:
    case GET_ONE:
        return {data: { ...data, id: data[meta.id] }}
    case CREATE:
        return {data: { ...data, id: data[meta.id] }}
    default:
        return { data }
    }
}

const convertCustomRequestToHTTP = (type, resource, params) => {
  let {data, ...query} = params || {}
  var url = `${apiUrl}/${resource}` + (Object.keys(query).length > 0 ? `?${queryParameters(query)}` : "")

  var options = {}
  switch (type) {
    case "CUSTOM/FETCH":
      options.method = "GET"
      break
    case "CUSTOM/EXECUTE":
      options.method = "POST"
      options.body   = JSON.stringify(data)
      break
    default:
      break
  }
  return {url, options}
}
/**s
 * @param {string} type Request type, e.g GET_LIST
 * @param {string} resource Resource name, e.g. "posts"
 * @param {Object} payload Request parameters. Depends on the request type
 * @returns {Promise} the Promise for a REST response
 */
export default async (type, resource, params) => {
  var convertRequestToHTTP = null
  var convertResponse      = null

  switch (type) {
    case "CUSTOM/FETCH":
    case "CUSTOM/EXECUTE":
      convertRequestToHTTP = convertCustomRequestToHTTP
      convertResponse      = response => ({data: response.json})
      break
    default:
      convertRequestToHTTP = convertRESTRequestToHTTP
      convertResponse      = convertHTTPResponseToREST
      break
  }
  const {url, options} = convertRequestToHTTP(type, resource, params)
  return convertResponse(await fetchJson(url, options), type, resource, params)
}
