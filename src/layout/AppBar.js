import React from 'react';
import { AppBar } from 'ra-ui-materialui';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

import Logo from './Logo';
import UserMenu from "./UserMenu"
import LanguageMenu from "./LanguageMenu"

const useStyles = makeStyles({
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    spacer: {
        flex: 1,
    },
})

const UserLangMenu = props => <React.Fragment>
  <LanguageMenu {...props} />
  <UserMenu {...props} />
</React.Fragment>


export default props => {
  const classes = useStyles()
  return <AppBar {...props} userMenu={<UserLangMenu />} color="primary">
      <Typography
          variant="h6"
          color="inherit"
          className={classes.title}
          id="react-admin-title"
      />
      <Logo />
  </AppBar>
}
