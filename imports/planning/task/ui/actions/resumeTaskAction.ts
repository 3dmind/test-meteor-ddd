import { Meteor } from 'meteor/meteor'
import { PLANNING_TASK_RESUME_METHOD } from '../../constants'
import { TaskDto } from '../../dto'
import { TaskPresenter } from '../presenter'

export function resumeTaskAction(task: TaskPresenter): Promise<void> {
  return new Promise((resolve, reject): void => {
    Meteor.call<TaskDto>(
      PLANNING_TASK_RESUME_METHOD,
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
