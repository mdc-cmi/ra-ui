import React from "react";
import {translate} from "ra-core"
import compose from 'recompose/compose';

import withStyles from "@material-ui/core/styles/withStyles";
import Update from "@material-ui/icons/Update";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx"

import style from "./assets/dashboard.jsx"
const enchance = compose(
  translate,
  withStyles(style)
)
const UIBox = enchance(({classes, translate, title, subTitle, footer, color, ...props}) =>(
  <Card>
    <CardHeader color={color || "primary"} stats icon>
      <CardIcon color={color || "primary"}>{props.icon}</CardIcon>
      <p className={classes.cardCategory}>{title}</p>
      <h3 className={classes.cardTitle}>{subTitle}</h3>
    </CardHeader>
    <CardFooter stats>
        {footer ||
          <div className={classes.stats}>
            <Update />
            {translate("titles.justUpdated")}
          </div>
        }

    </CardFooter>
  </Card>
))
export default UIBox
