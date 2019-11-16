import { Meteor } from 'meteor/meteor'
import { TaskDto } from '../../dto'
import { MethodNamesEnum } from '../../enums'
import { TaskPresenter } from '../presenter'

export function discardTaskAction(task: TaskPresenter): Promise<void> {
  return new Promise((resolve, reject): void => {
    Meteor.call<TaskDto>(
      MethodNamesEnum.DiscardTask,
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
