import React from 'react';
import SettingsIcon from "@material-ui/icons/Settings"
import ClientsIcon from "@material-ui/icons/Work"
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import { Query, useTranslate} from "ra-core"
import {useAccount} from "hooks"

const useStyles = makeStyles({
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    }
})

const Title = ({classes, icon, text}) => (
  <React.Fragment>
      {icon}
      &nbsp;
      <Typography variant="h6" color="inherit" className={classes.title}>{text}</Typography>
    </React.Fragment>
)
export default (props) => {
  const classes     = useStyles()
  const translate   = useTranslate()
  const {account}   = useAccount()

  let resource, id, icon
  if(account.userType  === "client") {
    resource = "clients"
    id = account.ClientId
    icon  = <ClientsIcon />
  } else if(account.userType  === "admin") {
    icon  = <SettingsIcon />
  }
  return resource ? (
    <Query type="GET_ONE" resource={resource} payload={{ id }}>
      {({ data, loading, error }) =>
        loading ? <span /> : error ? <span >{error.toString()}</span> :  <Title classes={classes} text={data.name} icon={icon} />}
    </Query>
  ) : <Title classes={classes} text={translate("userTypes.admin")} icon={icon} />
}
