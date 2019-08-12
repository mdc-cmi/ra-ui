import React from "react"
import { Field } from "react-final-form";
import { TextInput } from "ra-ui-materialui"

function format(value) {
  return ((typeof value === "object") ? JSON.stringify(value, null, 4 ) : value)
}
function parse(value) {
  try { return JSON.parse(value) } catch(e) {  return (value || {}) }
}

export default ({source, validate}) => {
  return <Field name={source}
    component={props => <TextInput multiline fullWidth {...props}/>}
    format={format}
    parse={parse}
    validate={validate}
    />
}
