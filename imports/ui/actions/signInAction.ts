import { Meteor } from 'meteor/meteor'

interface SignInAction {
  username: string
  password: string
}

export function signInAction({
  username,
  password,
}: SignInAction): Promise<void> {
  return new Promise((resolve, reject): void => {
    Meteor.loginWithPassword(username, password, (error) => {
      if (error) {
        reject(error)
      }
      resolve()
    })
  })
}
