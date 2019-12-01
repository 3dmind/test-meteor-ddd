import { Meteor } from 'meteor/meteor'
import { DiscardTaskDTO, DiscardTaskMethodName } from '../../api'
import { TaskPresenter } from '../presenter'

export function discardTaskAction(task: TaskPresenter): Promise<void> {
  return new Promise((resolve, reject): void => {
    Meteor.call<DiscardTaskDTO>(
      DiscardTaskMethodName,
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
