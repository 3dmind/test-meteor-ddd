import { Meteor } from 'meteor/meteor'
import { UniqueEntityId } from '../../../../core/domain/UniqueEntityId'
import { PLANNING_TASK_RESUME_METHOD } from '../../constants'

export function resumeTaskAction(taskId: UniqueEntityId): Promise<void> {
  return new Promise((resolve, reject): void => {
    Meteor.call(PLANNING_TASK_RESUME_METHOD, taskId.value, (error, value) => {
      if (error) {
        reject(error)
      }
      resolve(value)
    })
  })
}
