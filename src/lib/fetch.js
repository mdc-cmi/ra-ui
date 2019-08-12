import HttpError from "./HttpError"
import {Profiles} from "lib/authClient"

export const fetchJson = (url, options = {}) => {
    const token          = Profiles.getToken()
    const requestHeaders = new Headers({ Accept: "application/json" })

    if (options.method && options.method !== "GET") {
        // any request which is not GET
        requestHeaders.set("Content-Type", "application/json")
        if (token) {
            requestHeaders.set("Authorization", token)
        }
    } else {
        if (token) {
            let [path, qs] = url.split("?")
            url = `${path}?__authorization=${token}&${qs}`
        //console.log(path,qs,url)
        }
    }

    return fetch(url, { ...options, headers: requestHeaders })
        .then(response => response.text().then(text => ({
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
            body: text,
        })))
        .then(({ status, statusText, headers, body }) => {
            let json
            try {
                json = JSON.parse(body)
            } catch (e) {
                // not json, no big deal
            }
            if (status < 200 || status >= 300) {
              let error = json && json.error
              let message = statusText
              if(error) {
                if(error.errors)  error = error.errors[0]
                if(error && error.message) message = error.message
              }
              return Promise.reject(new HttpError(message, status))
            }
            return { status, headers, body, json }
        })
}

export const queryParameters = data => Object.keys(data)
    .map(key => [ key, Array.isArray(data[key]) ? data[key] : [data[key]]])
    .reduce((res, [key, value]) => res.concat(value.map(v => [key, v])), [])
    .map(pair => pair.map(encodeURIComponent).join("="))
    .join("&")
