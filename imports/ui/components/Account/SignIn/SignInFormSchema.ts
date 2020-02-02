import * as Yup from 'yup';
import { SignInFormValues } from './SignInFormValues';

export const SignInFormSchema = Yup.object().shape<SignInFormValues>({
  password: Yup.string()
    .trim()
    .required('Password is required'),

  username: Yup.string()
    .trim()
    .required('Username is required'),
});
