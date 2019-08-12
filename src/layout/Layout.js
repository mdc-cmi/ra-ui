import React from "react"
import { Layout } from "ra-ui-materialui";
import Menu from "./Menu"
import AppBar from "./AppBar"
export default props => <Layout {...props} appBar={AppBar}  menu={Menu} />
