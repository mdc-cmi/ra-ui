import React from "react";
import UsersIcon from "@material-ui/icons/AccountBox"
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import ResourceBox from "components/ResourceBox"

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <ResourceBox resource="users" icon={<UsersIcon />} />
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>

          </GridItem>
          <GridItem xs={12} sm={6} md={3}>

          </GridItem>
          <GridItem xs={12} sm={6} md={3}>

          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default Dashboard
