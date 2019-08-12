import React from "react"
import {SaveButton, DeleteButton, Toolbar} from "ra-ui-materialui"

const DefaultToolbar = props => {
  const {allowDelete, ...rest} = props
  return (<Toolbar {...rest}>
        <SaveButton redirect={props.redirect || "show"} submitOnEnter={true} />
        {allowDelete && <DeleteButton redirect="list"/>}
    </Toolbar>)
}

export default DefaultToolbar
