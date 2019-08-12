import React from "react"
import { TextField, TabbedShowLayout, SelectField, Tab} from "ra-ui-materialui"
import {Show, DefaultActions, LoginAsButton, checkPermissions } from  "components"
import {roles}                    from "lib/consts"
import { useRecord, useAccount }  from "hooks"


const ShowActions  = ({data, permissions, ...props}) => {
  const {account}  = useAccount()
  const loginAs = data && account.id !== data.id && checkPermissions(permissions, "loginAs")
  return <DefaultActions {...props}>
    {loginAs && <LoginAsButton record={data} {...props}/>}
  </DefaultActions>
}
export default ({permissions, ...props}) => {
  const {userType} = useRecord() || {}
  return <Show {...props} titleSource="email" actions={<ShowActions permissions={permissions}  />}>
      <TabbedShowLayout>
          <Tab label="tabs.summary" >
              <TextField source="name" />
              <TextField source="username" />
              <TextField source="email" />
              <SelectField source="role" choices={(roles[userType] || [])} />
          </Tab>
      </TabbedShowLayout>
  </Show>
}
