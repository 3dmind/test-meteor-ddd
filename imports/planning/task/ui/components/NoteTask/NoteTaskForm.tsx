import { Field, Form, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import React from 'react';
import { NoteTaskFormValues } from './NoteTaskFormValues';

interface NoteTaskFormProps {
  inputElementRef: React.RefObject<HTMLInputElement>;
}

export const NoteTaskForm: React.FunctionComponent<NoteTaskFormProps &
  FormikProps<NoteTaskFormValues>> = (props) => {
  const { inputElementRef, isSubmitting } = props;
  return (
    <Form>
      <Field
        fullWidth
        autoFocus
        disabled={isSubmitting}
        name={'text'}
        type={'text'}
        placeholder={'What needs to be done?'}
        variant={'outlined'}
        component={TextField}
        inputRef={inputElementRef}
      />
    </Form>
  );
};
