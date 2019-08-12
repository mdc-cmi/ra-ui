export default ({
    resources: {
      users: {
          name: "User |||| Users",
          fields: {
              name: "Name",
              userType: "Type",
              email: "Email",
              id: "Id",
              role: "Role",
              "password": "Password",
              "passwordConfirm": "Password confirmation",
          }
        },

    },
    appTitle: "RA Admin",
    consts: {
       days: "%{smart_count} day |||| %{smart_count} days",
    },
    locales: {
      "en": "English",
      "pt-BR": "Portuguese"
    },

    userTypes: {
      admin: "Super Admin",
      client: "Client",
    },

    actions: {
      deactivate: "Deactivate",
      approve: "Approve",
      discard: "Discard",
      block: "Block",
      send: "Send",
    },
    roles: {
      admin: {
        admin: "Admin",
        operator: "Operator"
      },
      client: {
        admin: "Client Manager",
        manager: "Site Manager"
      }
    },
    filters: {
      userType: "User Type",
      from: "Date From",
      until: "Date Until"
    },
    tabs: {
      summary: "Summary",
      users: "Users",
      password: "Password",
      details: "Details",
    },
    titles: {
      justUpdated: "Just Updated",
      config: "Config",
      create: "Create %{resource}",
      edit: "Edit %{resource}",
      profile: "Profile",
      loginAs: "Login As",
      login: "Login",
      logout: "Logout",
      remove: "Remove",
      forgotPassword: "Forgot Password",
      dateFrom: "From",
      dateUntil: "Until",
      yes: "Yes",
    },
    notifications: {
      loginAsSuccess: "Login Successfully",
      forgotSent: "Emails has been sent. Please check your inbox",
      updated: "Updated",
    },
    validation: {
        passwordConfirm: "Not same",
        moreThan: "Value should be more than %{source}",
        lessThan: "Value should be less than %{source}",
        phoneNumber: "Not valid phone number "
    }
})
