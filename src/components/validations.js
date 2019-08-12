import {required, number} from "ra-core"
import {memoize, get} from "lodash"

const json = value => ((typeof value === "object") ? null : "invalid json")
const passwordConfirmValidate = (value, allValues) => {
    if(allValues.password !== undefined && value !== allValues.password) {
        return "validation.passwordConfirm"
    }
    return undefined
}
const moreThan = (source, sourceName = null) =>
  (value, allValues) => {
    if(allValues[source] && value && value <= allValues[source]) {
      return ({
        message: "validation.moreThan",
        args: {source: sourceName || source}
      })
    }
    return undefined
  }
const lessThan = (source, sourceName = null) =>
    (value, allValues) => {
      if(allValues[source] && value && value >= allValues[source]) {
        return ({
          message: "validation.lessThan",
          args: {source: sourceName || source}
        })
      }
      return undefined
    }
const phone = () => (value, allValues) => {
  if(value && !value.match(/^\+?[\d]+$/)) {
    return "validation.phoneNumber"
  }
  return undefined
}

const requiredIf = memoize(function(source){
  return function(value, allValues) {
    if(get(allValues, source) && !value) {
      return "ra.validation.required"
    }
    return undefined
  }
})
export {required, phone, number, json, passwordConfirmValidate, moreThan, lessThan, requiredIf}
