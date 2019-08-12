import React from "react"
import { SimpleForm, TextInput, SelectInput} from "ra-ui-materialui"
import {email} from "ra-core"
import {Create, DefaultToolbar, checkPermissions, required}   from "components"
import {roles}     from "lib/consts"
import {useAccount}     from "hooks"

export default ({permissions, ...props}) => {
  const {account}    = useAccount()
  const rolesEnabled  = checkPermissions(permissions, "updateRole")
  return (
    <Create {...props} titleSource="email">
        <SimpleForm toolbar={<DefaultToolbar />} redirect="list" defaultValue={{userType: account.userType}} >
              <TextInput source="name" validate={required()}/>
              <TextInput source="username" validate={required()}/>
              <TextInput source="email" validate={email()}/>
              <TextInput source="password" autoComplete="off" type="password"  validate={required()}/>
              <TextInput source="passwordConfirm" autoComplete="off" type="password" validate={required()}/>
              <SelectInput source="role" validate={required()} choices={roles[account.userType]} allowEmpty disabled={!rolesEnabled} />
        </SimpleForm>
    </Create>)
}
