import React, {useCallback} from "react"
import {Link, UserMenu, Button} from "ra-ui-materialui";
import {userLogout} from "ra-core"
import MenuItem from '@material-ui/core/MenuItem';
import UserCard from "./components/UserCard";
import { makeStyles } from '@material-ui/styles';
import LogoutIcon from "@material-ui/icons/PowerSettingsNew"
import LoginIcon from '@material-ui/icons/Fingerprint';
import _ from "lodash"
import ProfileImage from "./components/ProfileImage"
import AccountContext from  "lib/AccountContext"
import useReactRouter from 'hooks/use-react-router';
import { useDispatch } from "react-redux"

const useStyles = makeStyles({
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-around",
  },

})

const Logout = ({account}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const {history} = useReactRouter()

  const logout = useCallback(() => {
    history.push("/login", {id: account.id})
    dispatch(userLogout("/login"))
  }, [dispatch, history, account])

  return <div className={classes.footer}>
    <Link to="/login">
      <Button label="titles.login" ><LoginIcon /></Button>
    </Link>
    <Button label="titles.logout" onClick={logout}><LogoutIcon /></Button>
  </div>
}


export default props => {
  const users = (profiles, account) => profiles && account && account.id ?
      _.sortBy(Object.values(profiles), (profile, index) => profile.id === account.id ? -1 : index) : []

  return <AccountContext.Consumer>
      {({account, profiles, ...rest}) => (
          <UserMenu {...props} logout={<Logout account={account}/>} icon={<ProfileImage profile={account} variant="menu"/>}>
            {users(profiles, account).map(profile =>
              <MenuItem key={profile.id} >
                <UserCard profile={profile} account={account} {...rest}/>
              </MenuItem>
            )}
            <hr />
          </UserMenu>
      )}
    </AccountContext.Consumer>
}
