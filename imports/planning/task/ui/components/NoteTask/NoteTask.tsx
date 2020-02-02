import { Grid, Paper, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Formik, FormikHelpers } from 'formik';
import { Meteor } from 'meteor/meteor';
import * as React from 'react';
import { useActions } from '../TaskActions';
import { NoteTaskForm } from './NoteTaskForm';
import { NoteTaskFormSchema } from './NoteTaskFormSchema';
import { NoteTaskFormValues } from './NoteTaskFormValues';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(1),
      marginBottom: theme.spacing(3),
    },
    error: {
      color: theme.palette.error.main,
    },
  }),
);

export const NoteTask: React.FunctionComponent = (props) => {
  const { noteTaskAction } = useActions();
  const classes = useStyles(props);
  const [error, setError] = React.useState<string>('');

  function handleFulfilled(
    formHelpers: FormikHelpers<NoteTaskFormValues>,
  ): void {
    formHelpers.resetForm();
    formHelpers.setSubmitting(false);
  }

  function handleRejected(exception: Meteor.Error): void {
    setError(exception.reason);
  }

  async function handleSubmit(
    values: NoteTaskFormValues,
    formHelpers: FormikHelpers<NoteTaskFormValues>,
  ): Promise<void> {
    const { text } = values;
    setError('');
    try {
      await noteTaskAction(text);
      handleFulfilled(formHelpers);
    } catch (exception) {
      handleRejected(exception);
    }
  }

  const initialValues: NoteTaskFormValues = {
    text: '',
  };
  return (
    <Paper className={classes.paper} elevation={2}>
      <Grid container spacing={2} direction={'column'}>
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
            component={NoteTaskForm}
            validationSchema={NoteTaskFormSchema}
            validateOnBlur={false}
            onSubmit={handleSubmit}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};
