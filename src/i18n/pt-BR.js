export default ({
    resources: {
      users: {
          name: "Usuário |||| Usuários",
          fields: {
              name: "Nome",
              userType: "Type",
              username: "Nome do Usuário",
              email: "E-mail",
              id: "Id",
              role: "Perfil",
              "password": "Senha",
              "passwordConfirm": "Confirmação da senha",
          }
      },

    },
    appTitle: "RA Admin",
    consts: {
       days: "%{smart_count} day |||| %{smart_count} days",
    },
    locales: {
      "en": "Inglês",
      "pt-BR": "Português"
    },

    userTypes: {
      admin: "Admin",
      client: "Cliente",
    },
    actions: {
      deactivate: "Desativado",
      approve: "Approve",
      discard: "Discard",
      block: "Block",
      send: "Send",
    },
    roles: {
      admin: {
        admin: "Admin",
        operator: "Operador"
      },
      client: {
        admin: "Gerente do Cliente",
        manager: "Gerente do Local"
      },
    },
    filters: {
      userType: "User Type",
      from: "Data Inicial",
      until: "Data Final"
    },
    tabs: {
      summary: "Geral",
      users: "Usuários",
      password: "Senha",
      details: "Details",
    },
    titles: {
      justUpdated: "Atualizado",
      config: "Configuração",
      create: "Criar %{resource}",
      edit: "Edit %{resource}",
      close: "Close",
      profile: "Profile",
      loginAs: "Login como",
      login: "Login",
      logout: "Sair",
      remove: "Apagar",
      forgotPassword: "Esqueceu sua senha?",
      dateFrom: "From",
      dateUntil: "Until",
      yes: "Sim",
    },
    notifications: {
      loginAsSuccess: "Login Successfully",
      forgotSent: "Emails has been sent. Please check your inbox",
    },
    validation: {
        passwordConfirm: "Not same",
        moreThan: "Value should be more than %{source}",
        lessThan: "Value should be less than %{source}",
        phoneNumber: "Not valid phone number "
    }
})
