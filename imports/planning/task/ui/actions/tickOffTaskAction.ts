import { Meteor } from 'meteor/meteor'
import { PLANNING_TASK_TICK_OFF_METHOD } from '../../constants'

export function tickOffTaskAction(taskId: string): Promise<void> {
  return new Promise((resolve, reject): void => {
    Meteor.call(PLANNING_TASK_TICK_OFF_METHOD, taskId, (error, value) => {
      if (error) {
        reject(error)
      }
      resolve(value)
    })
  })
}
