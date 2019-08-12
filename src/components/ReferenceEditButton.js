import React from "react"
import ContentCreate from '@material-ui/icons/Create';
import {Link, Button} from "ra-ui-materialui"

export default props => {
  const {basePath, label, record, icon, ...rest} = props
  const redirect = document.location.hash.substr(1)
  return <Link to={`${basePath}/${record.id}?redirect=${redirect}`} >
    <Button label="ra.action.edit" onClick={e => e.stopPropagation()} {...rest}>
        <ContentCreate />
    </Button>
  </Link>
}
