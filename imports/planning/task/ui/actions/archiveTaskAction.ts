import { Meteor } from 'meteor/meteor'
import { PLANNING_TASK_ARCHIVE_METHOD } from '../../constants'
import { TaskDto } from '../../dto'
import { TaskViewModel } from '../models'

export function archiveTaskAction(task: TaskViewModel): Promise<void> {
  return new Promise((resolve, reject): void => {
    Meteor.call<TaskDto>(
      PLANNING_TASK_ARCHIVE_METHOD,
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
