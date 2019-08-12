import React from "react"
import { useTranslate } from "ra-core"
import {get} from "lodash"

export default ({record, source, resource}) => {
  const translate = useTranslate()
  const resourceTitle = translate(`resources.${resource}.name`, {smart_count: 1})
  const fetch = typeof source == "function" ? (record => source(record)) : (record => get(record, source))
  return record && record.id !== undefined ?
    (<span>{resourceTitle}: {fetch(record)} </span>) :
    (<span>{translate("titles.create", {resource: resourceTitle})}</span>)
}
