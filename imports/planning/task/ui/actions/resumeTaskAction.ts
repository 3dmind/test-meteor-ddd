import { Meteor } from 'meteor/meteor'
import { ResumeTaskDTO, ResumeTaskMethodName } from '../../api'
import { TaskPresenter } from '../presenter'

export function resumeTaskAction(task: TaskPresenter): Promise<void> {
  return new Promise((resolve, reject): void => {
    Meteor.call<ResumeTaskDTO>(
      ResumeTaskMethodName,
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
