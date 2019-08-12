import React from "react"
import { Button} from "ra-ui-materialui"
import { showNotification} from "ra-core"
import LoginAsIcon from '@material-ui/icons/Fingerprint';
import {Profiles} from "lib/authClient"
import { useCallback, useDispatch, useRouter } from "hooks"
import {execute} from "components"

const loginAs = (id, callback) =>
  execute(`users/${id}/authenticate`, {}, { callback, redirectTo: "/", notification: "notifications.loginAsSuccess"})

export default ({record = {}, children}) => {
  const dispatch  = useDispatch()
  const {history}   = useRouter()
  const handleLogin = useCallback(() => {
    dispatch(loginAs(record.id, ({payload: {data}}) => {
      const {profile, token} = data
      dispatch(showNotification("notifications.loginAsSuccess"))
      Profiles.login(profile, token)
      history.push("/", {id: profile.id})
    }))
  }, [dispatch, record.id, history])

  return record && record.id ?
    children ?
      React.cloneElement(children, {onClick: handleLogin}) :
      <Button color="primary" onClick={handleLogin} label="titles.loginAs" ><LoginAsIcon /></Button>
    : <span />
}
