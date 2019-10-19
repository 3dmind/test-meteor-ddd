import { Meteor } from 'meteor/meteor'
import { PLANNING_TASK_DISCARD_METHOD } from '../../constants'
import { TaskDto } from '../../dto'
import { TaskUiModel } from '../models'

export function discardTaskAction(task: TaskUiModel): Promise<void> {
  return new Promise((resolve, reject): void => {
    Meteor.call<TaskDto>(
      PLANNING_TASK_DISCARD_METHOD,
      { taskId: task.id },
      (error, value) => {
        if (error) {
          reject(error)
        }
        resolve(value)
      },
    )
  })
}
