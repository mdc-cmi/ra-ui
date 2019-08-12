import React from "react"
import { Create, List, Edit, Show} from "ra-ui-materialui"
import DefaultActions   from "components/DefaultActions"
import ResourceTitle    from "components/ResourceTitle"
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    padding: 10
  }
})

const DefaultShow = (props) => {
  const {titleSource, ...rest} = props
  return (<Show
      title={<ResourceTitle resource={props.resource} source={titleSource || "id"}/>}
      actions={<DefaultActions />}
      {...rest}  />)
}
const DefaultList = (props) => {
  const classes = useStyles()
  return <List hasCreate={false} className={classes.root}
    hasEdit={false}
    hasList={false}
    hasShow={false}
    perPage={100} bulkActions={false}
    actions={<DefaultActions readOnly={props.readOnly} />}
    {...props}  />
}

const DefaultEdit = (props) => {
  const {titleSource, noRefresh, ...rest} = props
  return (<Edit
      undoable={false}
      title={<ResourceTitle resource={props.resource} source={titleSource || "id"}/>}
      actions={<DefaultActions noRefresh={noRefresh}/>}
      {...rest}
      />)
}
const DefaultCreate = (props) => {
  const {titleSource, ...rest} = props
  return (<Create
      title={<ResourceTitle resource={props.resource} source={titleSource || "id"}/>}
      actions={<DefaultActions/>}
      {...rest}
      />)
}
export {DefaultCreate as Create}
export {DefaultEdit as Edit}
export {DefaultShow as Show}
export {DefaultList as List}
