import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { Button, SaveButton, Toolbar } from "ra-ui-materialui"
import {useTranslate} from "ra-core"

import {crudCreate} from "./actions"
import IconContentAdd from '@material-ui/icons/Add';
import IconCancel from '@material-ui/icons/Cancel';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';


const ExternalToolbar = ({saving, handleSubmit, onClose}) => {
  return <Toolbar >
    <>
      <SaveButton saving={saving} onClick={handleSubmit}/>
      <Button label="ra.action.cancel" onClick={onClose}>
        <IconCancel />
      </Button>
    </>
  </Toolbar>
}

export default ({children, defaultValues, resource, label, onSubmit, title, ...props}) => {
  const translate = useTranslate()
  const dispatch = useDispatch()
  const [dialogOpen, setDialogOpen] = React.useState(false)

  const open = () => setDialogOpen(true)
  const close = () => setDialogOpen(false)

  const handleSubmit = (values, form) => {
    dispatch(crudCreate(resource, {...defaultValues, ...values}, () => {
      close()
      onSubmit && onSubmit()
    }))
  }
  const dialogTitle = translate(title || "titles.create", { resource: translate(`resources.${resource}.name`, {smart_count: 1})})
  return (
    <Fragment>
      <Button onClick={open} label={label || dialogTitle}>
          <IconContentAdd />
      </Button>
      <Dialog fullWidth open={dialogOpen} onClose={close} >
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          {React.cloneElement(children, {toolbar: <ExternalToolbar onClose={close}/>, onSubmit: handleSubmit})}
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}
