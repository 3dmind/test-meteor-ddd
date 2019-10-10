import { Meteor } from 'meteor/meteor'
import { PLANNING_TASK_RESUME_METHOD } from '../../constants'
import { TaskDto } from '../../dto'
import { TaskUiModel } from '../models'

export function resumeTaskAction(task: TaskUiModel): Promise<void> {
  return new Promise((resolve, reject): void => {
    const dto: TaskDto = { taskId: task.id }
    Meteor.call(PLANNING_TASK_RESUME_METHOD, dto, (error, value) => {
      if (error) {
        reject(error)
      }
      resolve(value)
    })
  })
}
