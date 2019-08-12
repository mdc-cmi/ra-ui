import React from "react"
import {SelectField, TextField, Datagrid,  EditButton} from "ra-ui-materialui"
import {List, ShowLink} from  "components"
import {roles}                            from "lib/consts"
import {useAccount}                       from "hooks"

export default ({permissions, ...props}) => {
  const {account}  = useAccount()
  const choices   = roles[account.userType] || []

  return account && <List {...props} filter={{userType: account.userType}} >
      <Datagrid >
          <ShowLink source="name" />
          <ShowLink source="username" />
          <TextField source="email" />
          <SelectField source="role" choices={choices} />
          <EditButton  />
      </Datagrid>
    </List>
}
