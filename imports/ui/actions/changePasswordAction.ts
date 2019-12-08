import { Accounts } from 'meteor/accounts-base'

interface ChangePasswordAction {
  password: string
  newPassword: string
}

export async function changePasswordAction({
  password,
  newPassword,
}: ChangePasswordAction): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    Accounts.changePassword(password, newPassword, (error) => {
      if (error) {
        reject(error)
      }

      resolve()
    })
  })
}
