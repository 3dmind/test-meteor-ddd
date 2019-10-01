import { Meteor } from 'meteor/meteor'
import { PLANNING_TASK_ARCHIVE_METHOD } from '../../constants'
import { ArchiveTaskDto } from '../../dto'

export function archiveTaskAction(taskId: string): Promise<void> {
  return new Promise((resolve, reject): void => {
    const archiveTaskDto = new ArchiveTaskDto(taskId)
    Meteor.call(
      PLANNING_TASK_ARCHIVE_METHOD,
      archiveTaskDto,
      (error, value) => {
        if (error) {
          reject(error)
        }
        resolve(value)
      },
    )
  })
}
