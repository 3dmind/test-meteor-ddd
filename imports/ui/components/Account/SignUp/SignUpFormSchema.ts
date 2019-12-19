import * as Yup from 'yup'
import { SignUpFormValues } from './SignUpFormValues'

export const SignUpFormSchema = Yup.object().shape<SignUpFormValues>({
  password: Yup.string()
    .trim()
    .required('Password is required.')
    .min(8, 'The password must be at least eight characters long.'),

  repeatedPassword: Yup.string()
    .required('Repeated password is required.')
    .when('password', (password, schema, options) => {
      const { value } = options
      if (!password || !value) {
        return schema
      }

      return schema.matches(
        new RegExp(`^${password}$`),
        'Repeated password does not match password.',
      )
    }),

  username: Yup.string()
    .trim()
    .required('Username is required.'),
})
