import React from 'react';
import { linkToRecord } from 'ra-core';
import {Link} from "ra-ui-materialui"
import { makeStyles } from '@material-ui/styles';
import classnames from 'classnames';
import get from "lodash/get"

const useStyles = makeStyles(theme => ({
  link: {
    color: theme.palette.primary.main
  }
}))

export default ({ basePath = '', record = {}, source, children, className, ...rest}) => {
  const classes = useStyles()
  return <Link className={classnames(classes.link, className)} to={`${linkToRecord(basePath, record.id)}/show`} {...rest}>
    {children && React.cloneElement(children, { record, source, basePath})}
    {source && get(record, source)}
  </Link>
}
