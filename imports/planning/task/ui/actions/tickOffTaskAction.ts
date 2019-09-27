import { Meteor } from 'meteor/meteor'
import { UniqueEntityId } from '../../../../core/domain/UniqueEntityId'
import { PLANNING_TASK_TICK_OFF_METHOD } from '../../constants'

export function tickOffTaskAction(taskId: UniqueEntityId): Promise<void> {
  return new Promise((resolve, reject): void => {
    Meteor.call(PLANNING_TASK_TICK_OFF_METHOD, taskId.value, (error, value) => {
      if (error) {
        reject(error)
      }
      resolve(value)
    })
  })
}
