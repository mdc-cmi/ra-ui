import React from 'react';
import { Field, Form } from 'react-final-form';

import { useSelector, useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/styles';
import {useTranslate, userLogin } from 'ra-core';
import ForgotPasswordButton from "./components/ForgotPasswordButton"

const useStyles = makeStyles(theme => ({
    form: {
      padding: '0 2em 2em 2em',
    },
    input: {
        marginTop: '1em',
    },
    buttonLogin: {
        width: '100%',
        marginBottom: 10
    },
    buttonPassword: {
      margin: "auto",
      textAlign: "center",
      display: "block",
      paddingTop: 20,
      color: "#999",
      textDecoration: "underline"
    },
    actions: {
      padding: '0 2em 2em 2em',
    }
}))

// see http://redux-form.com/6.4.3/examples/material-ui/
const Input = ({
    meta: { touched, error }, // eslint-disable-line react/prop-types
    input: inputProps, // eslint-disable-line react/prop-types
    ...props
}) => (
    <TextField
        error={!!(touched && error)}
        helperText={touched && error}
        {...inputProps}
        {...props}
        fullWidth
    />
);


export default ({ redirectTo }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.admin.loading > 0);
  const translate = useTranslate();
  const classes = useStyles({});

  const validate = (values: FormData) => {
      const errors = { username: undefined, password: undefined };

      if (!values.username) {
          errors.username = translate('ra.validation.required');
      }
      if (!values.password) {
          errors.password = translate('ra.validation.required');
      }
      return errors;
  };
  const submit = values => {
      dispatch(userLogin(values, redirectTo));
  }
  return <Form
            onSubmit={submit}
            validate={validate}
            render={({ handleSubmit, submitting }) => (
                <form onSubmit={handleSubmit} noValidate>
                    <div className={classes.form}>
                        <div className={classes.input}>
                            <Field
                                autoFocus
                                id="username"
                                name="username"
                                component={Input}
                                label={translate('ra.auth.username')}
                                disabled={isLoading}
                            />
                        </div>
                        <div className={classes.input}>
                            <Field
                                id="password"
                                name="password"
                                component={Input}
                                label={translate('ra.auth.password')}
                                type="password"
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                    <div className={classes.actions}>
                      <Button type="submit" disabled={submitting || isLoading} className={classes.buttonLogin} >
                        {translate("ra.auth.sign_in")}
                      </Button>
                      <br/>
                      <ForgotPasswordButton className={classes.buttonPassword} />
                    </div>
                </form>
            )}
        />
}
