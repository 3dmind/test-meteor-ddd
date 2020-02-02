import { Button, Grid } from '@material-ui/core';
import { Field, Form, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import * as React from 'react';
import { SignUpFormValues } from './SignUpFormValues';

export const SignUpForm: React.FunctionComponent<
  FormikProps<SignUpFormValues>
> = (props) => {
  const { isSubmitting, isValid } = props;
  const isSubmitButtonDisabled = isSubmitting || !isValid;

  return (
    <Form>
      <Grid container spacing={2} direction={'column'}>
        <Grid item xs={12}>
          <Field
            fullWidth
            variant={'outlined'}
            name={'username'}
            label={'Username'}
            type={'text'}
            component={TextField}
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            fullWidth
            variant={'outlined'}
            name={'password'}
            label={'Password'}
            type={'password'}
            component={TextField}
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            fullWidth
            variant={'outlined'}
            name={'repeatedPassword'}
            label={'Password (again)'}
            type={'password'}
            component={TextField}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            type={'submit'}
            variant={'contained'}
            color={'primary'}
            disabled={isSubmitButtonDisabled}
          >
            Sign up
          </Button>
        </Grid>
      </Grid>
    </Form>
  );
};
