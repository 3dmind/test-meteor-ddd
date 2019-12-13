import { Meteor } from 'meteor/meteor'
import { TickOffTaskDTO, TickOffTaskMethodName } from '../../api'
import { TaskPresenter } from '../presenter'

export async function tickOffTaskAction(task: TaskPresenter): Promise<void> {
  return new Promise(function executor(resolve, reject) {
    Meteor.call<TickOffTaskDTO>(
      TickOffTaskMethodName,
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
