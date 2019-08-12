import React from "react"
import {Link} from "ra-ui-materialui"
import {useTranslate} from "ra-core"
import IconAdd from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'

export default ({data, reference, source, label}) => {
  const translate = useTranslate()
  const redirect = document.location.hash.substr(1)
  const path = data ?  `/${reference}/create?${source}=${data.id}&redirect=${redirect}` : ""
  if(!label) {
    label = translate("titles.create", {
      resource: translate(`resources.${reference}.name`, {smart_count: 1})
    })
  }
  return <Link to={path}>
    <Button color="primary" > <IconAdd />{label}</Button>
  </Link>
}
