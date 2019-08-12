import React from "react"
import {Profiles} from "./authClient"
export default React.createContext({
  account: Profiles.getProfile(),
  profiles: Profiles.getProfiles(),
  setAccount: () => {},
  unsetAccount: () => {}
})
