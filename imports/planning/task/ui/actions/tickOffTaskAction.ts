import { Meteor } from 'meteor/meteor'
import { TickOffTaskDTO, TickOffTaskMethodName } from '../../api'
import { TaskPresenter } from '../presenter'

export function tickOffTaskAction(task: TaskPresenter): Promise<void> {
  return new Promise((resolve, reject): void => {
    Meteor.call<TickOffTaskDTO>(
      TickOffTaskMethodName,
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
