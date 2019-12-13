import { Meteor } from 'meteor/meteor'
import { ArchiveTaskDTO, ArchiveTaskMethodName } from '../../api'
import { TaskPresenter } from '../presenter'

export async function archiveTaskAction(task: TaskPresenter): Promise<void> {
  return new Promise(function executor(resolve, reject) {
    Meteor.call<ArchiveTaskDTO>(
      ArchiveTaskMethodName,
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
