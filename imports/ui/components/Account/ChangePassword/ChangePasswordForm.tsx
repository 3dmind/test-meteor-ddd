import { Button, Grid } from '@material-ui/core'
import { Field, Form, FormikProps } from 'formik'
import { TextField } from 'formik-material-ui'
import * as React from 'react'

export interface ChangePasswordValues {
  password: string
  newPassword: string
  newRepeatedPassword: string
}

export const ChangePasswordForm: React.FunctionComponent<
  FormikProps<ChangePasswordValues>
> = (props) => {
  const { isSubmitting, isValid } = props
  const isSubmitButtonDisabled = isSubmitting || !isValid
  return (
    <Form>
      <Grid container spacing={2} direction={'column'}>
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
            name={'newPassword'}
            label={'New Password'}
            type={'password'}
            component={TextField}
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            fullWidth
            variant={'outlined'}
            name={'newRepeatedPassword'}
            label={'New Password (again)'}
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
            Change password
          </Button>
        </Grid>
      </Grid>
    </Form>
  )
}
