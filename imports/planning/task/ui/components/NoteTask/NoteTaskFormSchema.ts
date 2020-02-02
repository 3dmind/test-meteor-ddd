import * as Yup from 'yup';
import { NoteTaskFormValues } from './NoteTaskFormValues';

export const NoteTaskFormSchema = Yup.object().shape<NoteTaskFormValues>({
  text: Yup.string()
    .trim()
    .required('A description of the task is required.'),
});
