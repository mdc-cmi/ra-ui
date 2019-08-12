import React from "react"
import { FormTab, TabbedForm, TextInput, SelectInput} from "ra-ui-materialui"
import {email} from "ra-core"
import {Edit, DefaultToolbar, checkPermissions, required, passwordConfirmValidate, redirectPath } from  "components"
import {roles}                from "lib/consts"
import {useRecord, useAccount} from "hooks"

export default ({records, permissions, ...props}) => {
  const {account}    = useAccount()
  const record       = useRecord() || account
  const rolesEnabled  = checkPermissions(permissions, "updateRole") && record.id !== account.id

  return(
      <Edit {...props} titleSource="email" >
          <TabbedForm toolbar={<DefaultToolbar />} redirect={redirectPath("list")}>
              <FormTab label="tabs.summary"  >
                  <TextInput source="username" validate={required()} />
                  <TextInput source="email" validate={email()}/>
                  <TextInput source="name" validate={required()}/>
                  <SelectInput source="role" validate={required()} choices={roles[record.userType] || []} allowEmpty disabled={!rolesEnabled}/>
              </FormTab>
              <FormTab label="tabs.password">
                  <TextInput source="password" autoComplete="off"  type="password" />
                  <TextInput source="passwordConfirm" autoComplete="off" type="password" validate={passwordConfirmValidate}  />
              </FormTab>
          </TabbedForm>
      </Edit>
  )
}
