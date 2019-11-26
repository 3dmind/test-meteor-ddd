import { Meteor } from 'meteor/meteor'
import { MethodNamesEnum } from '../../enums'

export function discardArchivedTasksAction(): Promise<void> {
  return new Promise((resolve, reject): void => {
    Meteor.call(MethodNamesEnum.DiscardAllArchivedTasks, (error, value) => {
      if (error) {
        reject(error)
      }
      resolve(value)
    })
  })
}
