import { Meteor } from 'meteor/meteor'
import { TaskDto } from '../../dto'
import { MethodNamesEnum } from '../../enums'
import { TaskPresenter } from '../presenter'

export function resumeTaskAction(task: TaskPresenter): Promise<void> {
  return new Promise((resolve, reject): void => {
    Meteor.call<TaskDto>(
      MethodNamesEnum.ResumeTask,
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
