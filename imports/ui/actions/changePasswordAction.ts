import { Accounts } from 'meteor/accounts-base'

interface ChangePasswordAction {
  oldPassword: string
  newPassword: string
}

export function changePasswordAction({
  oldPassword,
  newPassword,
}: ChangePasswordAction): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    Accounts.changePassword(oldPassword, newPassword, (error) => {
      if (error) {
        reject()
      }

      resolve()
    })
  })
}
