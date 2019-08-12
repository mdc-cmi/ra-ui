import React from "react"
import {changeLocale} from "ra-core";
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconEn from "./components/IconEn"
import IconBr from "./components/IconBr"
import {useTranslate, useState, useCallback, useDispatch, useSelector} from "hooks"


export default props => {
  const [anchorEl, setAnchorEl] = useState()
  const translate               = useTranslate()
  const dispatch                = useDispatch()
  const locale                  = useSelector(state => state.i18n.locale)

  const onOpen  = useCallback(event => setAnchorEl(event.currentTarget), [setAnchorEl])
  const onClose = useCallback(event => setAnchorEl(null), [setAnchorEl])
  const open    = Boolean(anchorEl)
  const switchLocale = useCallback(locale => () => {
    dispatch(changeLocale(locale))
    onClose()
    localStorage.setItem("locale", locale)
  }, [onClose, dispatch])

  return (<div>
    <IconButton
        aria-owns={open ? 'menu-lang-appbar' : null}
        aria-haspopup={true}
        color="inherit"
        onClick={onOpen}
    >
      {locale === "en" ? <IconEn /> : <IconBr />}
    </IconButton>
    <Menu id="menu-lang-appbar" anchorEl={anchorEl}
       anchorOrigin={{
           vertical: 'top',
           horizontal: 'right',
       }}
       transformOrigin={{
           vertical: 'top',
           horizontal: 'right',
       }}
      open={open} onClose={onClose}>
      <ListItem button onClick={switchLocale("en")}>
        <ListItemIcon><IconEn/></ListItemIcon>
        <ListItemText>{translate("locales.en")}</ListItemText>
      </ListItem>
      <ListItem button onClick={switchLocale("pt-BR")}>
        <ListItemIcon><IconBr/></ListItemIcon>
        <ListItemText>{translate("locales.pt-BR")}</ListItemText>
      </ListItem>
    </Menu>
    </div>
  )
}
