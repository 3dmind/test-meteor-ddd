import {
  Container,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import { Formik, FormikHelpers } from 'formik';
import { Meteor } from 'meteor/meteor';
import * as React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useActions } from '../ApplicationActions';
import { SignInForm, SignInFormSchema, SignInFormValues } from './SignIn';

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
);

interface HandleRejected {
  exception: Meteor.Error;
  formHelpers: FormikHelpers<SignInFormValues>;
}

interface HandleFulfilled {
  formHelpers: FormikHelpers<SignInFormValues>;
}

export const AccountSignIn: React.FunctionComponent = (props) => {
  const { signInAction } = useActions();
  const history = useHistory();
  const [error, setError] = React.useState<string>('');

  function handleFulfilled({ formHelpers }: HandleFulfilled): void {
    formHelpers.resetForm();
    formHelpers.setSubmitting(false);
    history.push('/');
  }

  function handleRejected({ exception, formHelpers }: HandleRejected): void {
    setError(exception.reason);
    formHelpers.setFieldValue('password', '', false);
  }

  async function handleSubmit(
    values: SignInFormValues,
    formHelpers: FormikHelpers<SignInFormValues>,
  ): Promise<void> {
    const { password, username } = values;
    setError('');
    try {
      await signInAction({ username, password });
      handleFulfilled({ formHelpers });
    } catch (exception) {
      handleRejected({ exception, formHelpers });
    }
  }

  const initialValues: SignInFormValues = {
    password: '',
    username: '',
  };
  const classes = useStyles(props);
  return (
    <Container component={'main'} maxWidth={'xs'}>
      <Paper elevation={5} className={classes.paper}>
        <Grid container spacing={2} direction={'column'}>
          <Grid item>
            <Typography component={'h1'} variant={'h5'} align={'center'}>
              Login
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
              component={SignInForm}
              validationSchema={SignInFormSchema}
              onSubmit={handleSubmit}
            />
          </Grid>
          <Grid item>
            <Typography component={'p'} align={'right'}>
              <Link to={'/signup'}>Don&apos;t have an account? Sign up</Link>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
