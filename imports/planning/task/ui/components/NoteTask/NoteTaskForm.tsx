import { Field, Form, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import * as React from 'react';
import { NoteTaskFormValues } from './NoteTaskFormValues';

export const NoteTaskForm: React.FunctionComponent<
  FormikProps<NoteTaskFormValues>
> = (props) => {
  const { isSubmitting } = props;
  return (
    <Form>
      <Field
        fullWidth
        disabled={isSubmitting}
        name={'text'}
        type={'text'}
        placeholder={'What needs to be done?'}
        variant={'outlined'}
        component={TextField}
      />
    </Form>
  );
};
