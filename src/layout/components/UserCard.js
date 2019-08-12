import React from 'react';
import {Link, Button} from "ra-ui-materialui"
import {useTranslate, userLogout} from "ra-core"
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ProfileIcon from "@material-ui/icons/Person"
import LogoutIcon from "@material-ui/icons/PowerSettingsNew"
import RemoveIcon from '@material-ui/icons/Delete';
import {roles, userTypes} from "lib/consts"
import {find } from "lodash"
import ProfileImage from "./ProfileImage"
import { useCallback, useDispatch, useRouter } from "hooks"

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    width: 300,
  },
  cardActive: {
    display: 'flex',
    width: 300,
    backgroundColor: "#EEE"
  },
  cover: {
    margin: "10px 10px",
    width: 64,
    height: 64,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: "70%"
  },
  user: {
    whiteSpace: "normal"
  },
  content: {
    flex: '1 0 auto',
    justifyContent: "flex-start",
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    padding: 10,
    justifyContent: "flex-end",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  }
}))

export default ({account, setAccount, unsetAccount, profile, ...props}) => {
  const classes = useStyles()
  const translate = useTranslate()
  const dispatch = useDispatch()
  const {history} = useRouter()

  const active = account && account.id === profile.id
  const unset = useCallback(profile => (event) => {
    event.stopPropagation()
    unsetAccount(profile)
  }, [unsetAccount])
  const loginAs = useCallback(profile => () => {
    if(!active) {
      setAccount(profile)
      history.push("/", {id: profile.id})
    }
  }, [setAccount, history, active])

  const logout = useCallback(() => {
    history.push("/login", {id: account.id})
    dispatch(userLogout("/login"))
  }, [dispatch, history, account])

  function userRole() {
    const type = find(userTypes, ["id", profile.userType]).name
    const role = find(roles[profile.userType],["id", profile.role]).name
    return translate(type) + " " + translate(role)
  }

  return <Card className={active ? classes.cardActive : classes.card}  elevation={1} onClick={loginAs(profile)}>
      <ProfileImage profile={profile} variant="profile"/>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="subtitle1" color={active ? "primary" : "inherit"}>{profile.name}</Typography>
          <Typography className={classes.user} variant="subtitle1" color="textSecondary">{userRole()}</Typography>
        </CardContent>
        <div className={classes.controls}>
          {active && <Link to="/profile" >
            <Button label="titles.profile"><ProfileIcon /></Button>
          </Link>}
          {active &&  <Button label="titles.logout" onClick={logout}>
            <LogoutIcon />
          </Button>}
          {!active &&  <Button label="titles.remove" onClick={unset(profile)}>
            <RemoveIcon />
          </Button>}
        </div>
      </div>
    </Card>
}
