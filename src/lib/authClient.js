import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK, AUTH_GET_PERMISSIONS   } from "ra-core"
import config from "config"
import _ from "lodash"

const Profiles = {
  addListener(type, fn) {
    Profiles.listeners = Profiles.listeners || {}
    Profiles.listeners[type] = Profiles.listeners[type] || []
    Profiles.listeners[type].push(fn)
  },
  removeListener(type, fn) {
    if(Profiles.listeners && Profiles.listeners[type]) {
      let index = Profiles.listeners[type].indexOf(fn)
      if(index >=0)
        Profiles.listeners[type].splice(index, 1)
    }
  },
  emit(type, args) {
    if(Profiles.listeners && Profiles.listeners[type]) {
      _.each(Profiles.listeners[type], fn => fn(args))
    }
  },
  getToken: () => localStorage.getItem("token"),
  setToken: (token) => (token ? localStorage.setItem("token", token) : localStorage.removeItem("token")),
  getProfiles: () => (JSON.parse(localStorage.getItem("profiles")) || {}),
  setProfiles: (profiles) => localStorage.setItem("profiles", JSON.stringify(profiles)),

  getProfile: () => {
    let profiles = Profiles.getProfiles()
    let token    = Profiles.getToken()
    return _.find(profiles, ["token", token])
  },
  getPermissions: () => {
    let profile = Profiles.getProfile()
    if(profile) {
      return profile.permissions || []
    } else {
      return null
    }
  },
  login: (profile, token) => {
    let profiles = Profiles.getProfiles()
    profiles[profile.id] = {...profile, token}
    Profiles.setProfiles(profiles)
    Profiles.setToken(token)
    Profiles.emit("account", profile)
    Profiles.emit("profiles", profiles)
  },
  logout: () => {
    let profiles = Profiles.getProfiles()
    let token    = Profiles.getToken()
    Profiles.setToken(null)
    Profiles.emit("account", null)
    let profile = _.find(profiles, ["token", token])
    if(profile) {
      delete profiles[profile.id]
      Profiles.setProfiles(profiles)
      Profiles.emit("profiles", profiles)
    }
  },
  unset: (id) => {
    let profiles = Profiles.getProfiles()
    if(profiles[id]) {
      //Logout if unset current profile
      let token    = Profiles.getToken()
      if(profiles[id].token === token) {
        Profiles.setToken(null)
        Profiles.emit("account", null)
      }
      delete profiles[id]
      Profiles.setProfiles(profiles)
      Profiles.emit("profiles", profiles)
    }
  }
}

export {Profiles}
export default (type, params) => {
    if (type === AUTH_LOGIN) {
        const { username, password, token } = params
        const request = new Request(`${config.apiUrl}/authenticate`, {
            method: "POST",
            body: JSON.stringify({ username, password, token }),
            headers: new Headers({ "Content-Type": "application/json" }),
        })
        return fetch(request).then(response => {
            if (response.status < 200 || response.status >= 300) {
                throw new Error(response.statusText)
            }
            return response.json()
        }).then(({ token, profile }) => Profiles.login(profile, token))
    }
    if (type === AUTH_LOGOUT) {
        Profiles.logout()
        return Promise.resolve("/login")
    }
    if (type === AUTH_ERROR) {
        const { status } = params
        //if (status === 401 || status === 403) {
        if (status === 401) {
            Profiles.logout()
            return Promise.reject()
        }
        return Promise.resolve("/login")
    }
    if (type === AUTH_GET_PERMISSIONS) {
        let permissions = Profiles.getPermissions()
        return permissions ? Promise.resolve(permissions) : Promise.reject("/login")
    }
    if (type === AUTH_CHECK) {
        return Profiles.getToken() ? Promise.resolve() : Promise.reject("/login")
    }
    return Promise.reject("Unkown method")
}
