import React from 'react';
import { makeStyles } from '@material-ui/styles';
import CardMedia from '@material-ui/core/CardMedia';
import md5 from "js-md5";
const useStyles = makeStyles({
  profile: {
    margin: "10px 10px",
    width: 64,
    height: 64,
  },
  menu: {
    width: 32,
    height: 32,
    borderRadius: 32,
    backgroundColor: "#FFF"
  }
});
const variants = {
  profile: {
    className: "profile",
    size: 64
  },
  menu: {
    className: "menu",
    size: 32
  }
}
function profileUrl(profile, size) { return profile.email ? `https://www.gravatar.com/avatar/${md5(profile.email)}?size=${size}` : '' }
export default ({profile, variant = "profile"}) => {
  const classes = useStyles()
  return <CardMedia className={classes[variants[variant].className]} image={profileUrl(profile, variants[variant].size)} />
}
