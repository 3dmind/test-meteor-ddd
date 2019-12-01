import { Meteor } from 'meteor/meteor'
import { DiscardAllArchivedTasksMethodName } from '../../api'

export function discardArchivedTasksAction(): Promise<void> {
  return new Promise((resolve, reject): void => {
    Meteor.call(DiscardAllArchivedTasksMethodName, (error, value) => {
      if (error) {
        reject(error)
      }
      resolve(value)
    })
  })
}
