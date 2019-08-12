import React from "react"
import {EditButton, RefreshButton, ListButton, ShowButton, DeleteButton, CreateButton, TopToolbar} from "ra-ui-materialui"
import PropTypes from "prop-types"

const cardActionStyle = {
    display: "flex",
    "justifyContent": "flex-end",
    "flexWrap": "wrap"
}

const DefaultActions = ({ basePath, hasEdit, hasList, hasCreate,  hasDelete,
          children, resource, data, hasShow, noRefresh, readOnly }) => {

    if(readOnly) {
      hasEdit = false
      hasCreate = false
      hasDelete = false
    }
    if(data === undefined) {
      hasShow = false
      hasDelete = false
      hasEdit = false
    }
    return (
        <TopToolbar style={cardActionStyle}>
            {hasList && <ListButton basePath={basePath}  />}
            {hasShow && <ShowButton basePath={basePath} record={data} />}
            {hasEdit && <EditButton basePath={basePath} record={data} />}
            {hasCreate && <CreateButton basePath={basePath} />}
            {!noRefresh && <RefreshButton record={data}/>}
            {hasDelete && <DeleteButton basePath={basePath} record={data} resource={resource} />}
            {children}
        </TopToolbar>
    )
}

DefaultActions.propTypes = {
    basePath: PropTypes.string,
    resource: PropTypes.string,
    hasEdit: PropTypes.bool,
    hasList: PropTypes.bool,
    hasCreate: PropTypes.bool,
    hasDelete: PropTypes.bool,
    data: PropTypes.object,
    children: PropTypes.node,
}
export default DefaultActions
