import React from "react"
import {Loading, SimpleForm, TextInput, DisabledInput} from "ra-ui-materialui"
import {Edit, DefaultToolbar, required, passwordConfirmValidate } from  "components"
import { useAccount } from "hooks"

export default props => {
  const {account} = useAccount()
  return account.id ? (
      <Edit {...props} basePath="/users" resource="users" titleSource="email" id={account.id} >
          <SimpleForm toolbar={<DefaultToolbar />} redirect="list" >
            <DisabledInput source="email"  />
            <TextInput source="username" validate={required()} />
            <TextInput source="name" validate={required()}/>
            <TextInput source="password" autoComplete="off"  type="password" />
            <TextInput source="passwordConfirm" autoComplete="off" type="password" validate={passwordConfirmValidate}  />
          </SimpleForm>
      </Edit>) : <Loading />
}
