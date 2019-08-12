import React from "react"
import {DateField} from "ra-ui-materialui"
import {timeOptions} from "lib/consts"
export default ({options, ...props}) => (<DateField options={options || timeOptions} {...props}  />)
