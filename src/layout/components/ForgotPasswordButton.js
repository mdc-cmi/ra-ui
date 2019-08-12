import React from 'react';
import { Field} from 'react-final-form';
import { useTranslate, showNotification } from 'ra-core';
import { useDispatch } from 'react-redux';
import MuiButton from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import {execute} from "components"
import { Link } from 'ra-ui-materialui';

const Input = ({
    meta: { touched, error } = { touched: false, error: '' }, // eslint-disable-line react/prop-types
    input: { ...inputProps }, // eslint-disable-line react/prop-types
    ...props
}) => <TextField
    error={!!(touched && error)}
    helperText={touched && error}
    {...inputProps}
    {...props}
    fullWidth
/>

const useStyles = makeStyles(theme => ({
    root: {
      padding: '0 1em 1em 1em',
    },
}))

export default ({username, className}) => {
  const dispatch = useDispatch()
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [disabled, setDisabled]     = React.useState(false)

  const translate = useTranslate()
  const classes   = useStyles()

  const open = () => setDialogOpen(true)
  const close = () => setDialogOpen(false)

  const save = () => {
    setDisabled(true)
    const username = document.getElementById("username").value
    dispatch(execute("restore-password", {username}, () => {
      dispatch(showNotification("notifications.forgotSent", "info"))
      close()
    }))
  }
  const label = translate("titles.forgotPassword")
  return (<>
      <Link to="#" onClick={open} className={className} >{label}</Link>
      <Dialog  open={dialogOpen} onClose={close} aria-label={label}>
        <DialogTitle>{label}</DialogTitle>
        <DialogContent className={classes.root} classes={classes}>
          <Field name="username" component={Input} label={translate("ra.auth.username")} disabled={disabled} />
        </DialogContent>
        <DialogActions>
            <MuiButton disabled={disabled} onClick={save}>
              {translate("actions.send")}
            </MuiButton>
            <MuiButton label="ra.action.cancel" onClick={close}>
              {translate("ra.action.cancel")}
            </MuiButton>
        </DialogActions>
      </Dialog>
    </>
  )
}
