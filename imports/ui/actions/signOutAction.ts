import { Meteor } from 'meteor/meteor'

export function signOutAction(): Promise<void> {
  return new Promise((resolve, reject): void => {
    Meteor.logout((error) => {
      if (error) {
        reject(error)
      }
      resolve()
    })
  })
}
