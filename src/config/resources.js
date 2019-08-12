import React from "react"
import {checkPermissions}           from "components"
import {Resource}  from "ra-core"
import {Route }                     from "react-router-dom"

import Users, {Profile}     from "resources/User"
import Dashboard            from "resources/Dashboard"

const ResourceFor = ({name, rest, permissions, access = {}, ...props}) => {
  const hasAccess = type => access[type] && permissions ? checkPermissions(permissions, ...access[type]) : true
  const resource = type => (rest[type] && hasAccess(type)) ? rest[type] : null
  return <Resource key={name} name={name}
      show={resource("Show")}
      list={resource("List")}
      edit={resource("Edit")}
      create={resource("Create")} {...props}/>
}
export default permissions => {
  return permissions && [
      <ResourceFor name="users" rest={Users} permissions={permissions} access={{
          Edit:  ["manageUsers"],
          Create:["manageUsers"],
        }}/>,
  ]
}
const customRoutes = [
  <Route key="profile" exact path="/profile" render={() => <Profile resource="users" basePath="/users" />} />,
]
const dashboard = Dashboard
export {customRoutes, dashboard}
