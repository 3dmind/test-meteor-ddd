import * as Yup from 'yup'
import { SignInFormValues } from './SignInForm'

export const SignInSchema = Yup.object().shape<SignInFormValues>({
  password: Yup.string()
    .trim()
    .required('Password is required'),

  username: Yup.string()
    .trim()
    .required('Username is required'),
})
