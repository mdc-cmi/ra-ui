// in src/App.js
import React from "react"
import {CoreAdmin as Admin,} from "ra-core"
import { Loading, NotFound, Logout} from 'ra-ui-materialui';
import { ThemeProvider,  }  from '@material-ui/styles';
import theme                from  "themes/main"
import { createBrowserHistory } from 'history';
import LoginPage  from "layout/LoginPage"
import Layout     from "layout/Layout"
import AccountContext from  "lib/AccountContext"


import authClient       from "lib/authClient"
import dataProvider     from "lib/dataProvider"
import addUploadFeature from "lib/addUploadFeature"
import createRealtimeSaga from "lib/createRealtimeSaga"

import i18nProvider, {pickLocale} from "config/i18n"
import resources, {customRoutes, dashboard}  from "config/resources"
import {useAccountContext}        from "hooks/use-account"

const uploadCapableDataProvider = addUploadFeature(dataProvider)
const realTimeSaga              = createRealtimeSaga(dataProvider)
const history                   = createBrowserHistory()

export default props => {
  const context   = useAccountContext()
  const {account} = context

  return <AccountContext.Provider value={context}>
    <ThemeProvider theme={theme}>
      <Admin key={account ? account.id : "guest"} title={"SASI Admin"}
          theme={theme}
          locale={pickLocale()}
          i18nProvider={i18nProvider}
          authProvider={authClient}
          dataProvider={uploadCapableDataProvider}
          history={history}
          layout={Layout}
          loginPage={LoginPage}
          loading={Loading}
          catchAll={NotFound}
          logoutButton={Logout}
          dashboard={dashboard}
          customRoutes={customRoutes}
          customSagas={[realTimeSaga]}
          >
        {resources}
      </Admin>
    </ThemeProvider>
  </AccountContext.Provider>
}
