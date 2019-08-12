const roles = {
  admin: [
    { id: "admin", name: "roles.admin.admin", key: "admin" },
    { id: "operator", name: "roles.admin.operator", key: "operator" },
  ],
  client: [
    { id: "admin", name: "roles.client.admin" },
    { id: "manager", name: "roles.client.manager" },
  ],
}
const userTypes = [
  { id: "admin", name: "userTypes.admin", key: "admin" },
  { id: "client", name: "userTypes.client", key: "client" },
]
const timeOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false ,
}
export {
  roles,
  userTypes,
  timeOptions
}
