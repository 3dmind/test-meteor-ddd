import { Meteor } from 'meteor/meteor'
import { PLANNING_TASK_ARCHIVE_METHOD } from '../../constants'
import { TaskDto } from '../../dto'
import { TaskUiModel } from '../TaskUiModel'

export function archiveTaskAction(task: TaskUiModel): Promise<void> {
  return new Promise((resolve, reject): void => {
    const archiveTaskDto = new TaskDto(task)
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
