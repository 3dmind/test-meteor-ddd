import { Meteor } from 'meteor/meteor'
import { PLANNING_TASK_DISCARD_METHOD } from '../../constants'
import { TaskDto } from '../../dto'
import { TaskUiModel } from '../models'

export function discardTaskAction(task: TaskUiModel): Promise<void> {
  return new Promise((resolve, reject): void => {
    const dto: TaskDto = { taskId: task.id }
    Meteor.call(PLANNING_TASK_DISCARD_METHOD, dto, (error, value) => {
      if (error) {
        reject(error)
      }
      resolve(value)
    })
  })
}
