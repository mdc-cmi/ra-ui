import React from "react";
import {translate, Query} from "ra-core"
import compose from 'recompose/compose';
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from 'ra-ui-materialui';
import UIBox from "./UIBox"

import style from "./assets/dashboard.jsx"
const enchance = compose(
  translate,
  withStyles(style)
)
const ResourceBox = enchance(props =>(
  <Query type="GET_LIST" resource={props.resource} payload={{filter: {}, sort: {}}} >
    {({ total, loading, error }) =>
      (loading ? <span /> : error ? <span >{error}</span> :
      <UIBox {...props}
        title={props.translate(`resources.${props.resource}.name`, {smart_count: 2})}
        subTitle={<Link to={`/${props.resource}`}>{total}</Link>} /> )
    }
  </Query>
))

export default ResourceBox
