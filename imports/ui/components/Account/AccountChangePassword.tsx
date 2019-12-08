import {
  Container,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core'
import { Formik, FormikHelpers } from 'formik'
import { Meteor } from 'meteor/meteor'
import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { useActions } from '../ApplicationActions'
import {
  ChangePasswordForm,
  ChangePasswordSchema,
  ChangePasswordValues,
} from './ChangePassword'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(8),
      padding: theme.spacing(3),
    },
    error: {
      color: theme.palette.error.main,
    },
  }),
)

interface HandleRejected {
  exception: Meteor.Error
  formHelpers: FormikHelpers<ChangePasswordValues>
}

interface HandleFulfilled {
  formHelpers: FormikHelpers<ChangePasswordValues>
}

export const AccountChangePassword: React.FunctionComponent = (props) => {
  const { changePasswordAction } = useActions()
  const history = useHistory()
  const [error, setError] = React.useState<string>('')

  function handleFulfilled({ formHelpers }: HandleFulfilled): void {
    formHelpers.resetForm()
    formHelpers.setSubmitting(false)
    history.push('/')
  }

  function handleRejected({ exception, formHelpers }: HandleRejected): void {
    setError(exception.reason)
    formHelpers.resetForm()
  }

  async function handleSubmit(
    values: ChangePasswordValues,
    formHelpers: FormikHelpers<ChangePasswordValues>,
  ): Promise<void> {
    const { password, newPassword } = values
    setError('')
    try {
      await changePasswordAction({ password, newPassword })
      handleFulfilled({ formHelpers })
    } catch (exception) {
      handleRejected({ exception, formHelpers })
    }
  }

  const initialValues: ChangePasswordValues = {
    password: '',
    newPassword: '',
    newRepeatedPassword: '',
  }
  const classes = useStyles(props)
  return (
    <Container component={'main'} maxWidth={'xs'}>
      <Paper elevation={5} className={classes.paper}>
        <Grid container spacing={2} direction={'column'}>
          <Grid item>
            <Typography component={'h1'} variant={'h5'} align={'center'}>
              Change password
            </Typography>
          </Grid>
          {error && (
            <Grid item>
              <Typography
                className={classes.error}
                component={'p'}
                align={'center'}
              >
                {error}
              </Typography>
            </Grid>
          )}
          <Grid item>
            <Formik
              initialValues={initialValues}
              component={ChangePasswordForm}
              validationSchema={ChangePasswordSchema}
              onSubmit={handleSubmit}
            />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}
