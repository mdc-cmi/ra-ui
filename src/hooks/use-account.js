import { useContext, useState, useEffect} from 'react';
import AccountContext                     from 'lib/AccountContext';
import {Profiles}                         from "lib/authClient"

export default function useAccount() {
  const context = useContext(AccountContext)
  return context
}

export function useAccountContext() {
  const [account, setAccount]    = useState(Profiles.getProfile())
  const [profiles, setProfiles]  = useState(Profiles.getProfiles())

  useEffect(() => {
    Profiles.addListener("account", setAccount)
    Profiles.addListener("profiles", setProfiles)
    return  () => {
      Profiles.removeListener("account", setAccount)
      Profiles.removeListener("profiles", setProfiles)
    }
  }, [setAccount, setProfiles])

  return ({
    account,
    profiles,
    setAccount:   account => Profiles.login(account, account.token),
    unsetAccount: account => Profiles.unset(account.id),
  })
}
