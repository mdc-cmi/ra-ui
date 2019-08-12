import {CRUD_GET_ONE, CRUD_UPDATE, UPDATE, GET_ONE, CRUD_CREATE, CREATE, CRUD_GET_ALL, GET_LIST, CRUD_DELETE, DELETE} from "ra-core"

const responseHandler = (onComplete, notification) =>
  (typeof(onComplete) === "function") ? ({ callback: onComplete}) :
  (typeof(onComplete) === "string" ? ({
      notification: {
        body: onComplete,
        level: notification.level
      }}) : (onComplete || notification))

const responseArgs = (onSuccess, onFailure = null) => ({
  onSuccess: responseHandler(onSuccess, null),
  onFailure: responseHandler(onFailure, {notification: {
    body: 'ra.notification.http_error',
    level: 'warning',
  }}),
})

const fetchAll = (resource, sort, filter, onSuccess, onFailure = null) => ({
    type: CRUD_GET_ALL,
    payload: { filter, sort, },
    meta: {
        resource,
        fetch: GET_LIST,
        ...responseArgs(onSuccess, onFailure)
    },
});
const fetchOne = (resource, id, onSuccess, onFailure = null) => ({
  type: CRUD_GET_ONE,
  payload: { id },
  meta: {
    resource: resource,
    fetch: GET_ONE,
    basePath: resource,
    ...responseArgs(onSuccess, onFailure)
  },
})
const crudUpdate = (resource, id, data, onSuccess, onFailure = null) => {
  return ({
    type: CRUD_UPDATE,
      payload: { id, data, previousData: data },
      meta: {
          resource,
          fetch: UPDATE,
          ...responseArgs(onSuccess, onFailure)
      },

  })
}
const crudCreate = (resource, data, onSuccess, onFailure = null) => ({
    type: CRUD_CREATE,
    payload: { data },
    meta: {
        resource,
        fetch: CREATE,
        ...responseArgs(onSuccess, onFailure)
    },
})
const crudDelete = (resource, id, onSuccess, onFailure = null) => ({
    type: CRUD_DELETE,
    payload: { id },
    meta: {
        resource,
        fetch: DELETE,
        ...responseArgs(onSuccess, onFailure)
    },
})
const execute = (path, data, onSuccess, onFailure = null) =>  ({
    type: "SASI/EXECUTE",
    payload: { data },
    meta: {
        resource: path,
        fetch: "CUSTOM/EXECUTE",
        ...responseArgs(onSuccess, onFailure)
    },

})
const fetch = (path, params, onSuccess, onFailure = null) =>  ({
    type: "SASI/FETCH",
    payload: { ...params },
    meta: {
        resource: path,
        fetch: "CUSTOM/FETCH",
        ...responseArgs(onSuccess, onFailure)
    },

})
export {fetchOne, fetchAll, crudUpdate, crudCreate, execute, fetch, crudDelete}
