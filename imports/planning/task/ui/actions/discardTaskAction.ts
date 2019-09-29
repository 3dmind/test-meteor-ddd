import { Meteor } from 'meteor/meteor'
import { PLANNING_TASK_DISCARD_METHOD } from '../../constants'

export function discardTaskAction(taskId: string): Promise<void> {
  return new Promise((resolve, reject): void => {
    Meteor.call(PLANNING_TASK_DISCARD_METHOD, taskId, (error, value) => {
      if (error) {
        reject(error)
      }
      resolve(value)
    })
  })
}
