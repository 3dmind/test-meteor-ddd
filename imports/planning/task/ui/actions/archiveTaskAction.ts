import { Meteor } from 'meteor/meteor'
import { ArchiveTaskDTO, ArchiveTaskMethodName } from '../../api'
import { TaskPresenter } from '../presenter'

export function archiveTaskAction(task: TaskPresenter): Promise<void> {
  return new Promise((resolve, reject): void => {
    Meteor.call<ArchiveTaskDTO>(
      ArchiveTaskMethodName,
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
