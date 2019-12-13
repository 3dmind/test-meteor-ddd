import { Meteor } from 'meteor/meteor'
import { DiscardTaskDTO, DiscardTaskMethodName } from '../../api'
import { TaskPresenter } from '../presenter'

export async function discardTaskAction(task: TaskPresenter): Promise<void> {
  return new Promise(function executor(resolve, reject) {
    Meteor.call<DiscardTaskDTO>(
      DiscardTaskMethodName,
      { taskId: task.id },
      function callback(error, value) {
        if (error) {
          reject(error)
        }
        resolve(value)
      },
    )
  })
}
