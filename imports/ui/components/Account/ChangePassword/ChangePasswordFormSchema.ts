import * as Yup from 'yup'
import { ChangePasswordFormValues } from './ChangePasswordFormValues'

export const ChangePasswordFormSchema = Yup.object().shape<
  ChangePasswordFormValues
>({
  password: Yup.string()
    .trim()
    .required('Password is required'),

  newPassword: Yup.string()
    .trim()
    .required('New password is required.')
    .min(8, 'The new password must be at least eight characters long.'),

  newRepeatedPassword: Yup.string()
    .required('Repeated new password is required.')
    .when('newPassword', (newPassword, schema, options) => {
      const { value } = options
      if (!newPassword || !value) {
        return schema
      }

      return schema.matches(
        new RegExp(`^${newPassword}$`),
        'Repeated new password does not match new password.',
      )
    }),
})
