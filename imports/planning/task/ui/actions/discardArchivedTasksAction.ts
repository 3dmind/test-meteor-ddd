import { Meteor } from 'meteor/meteor'
import { PLANNING_TASK_DISCARD_ALL_ARCHIVE_METHOD } from '../../constants'
import { DiscardArchivedTasksDto } from '../../dto'
import { TaskUiModel } from '../TaskUiModel'

export function discardArchivedTasksAction(
  tasks: TaskUiModel[],
): Promise<void> {
  return new Promise((resolve, reject): void => {
    const discardArchivedTasksDto = new DiscardArchivedTasksDto(tasks)
    Meteor.call(
      PLANNING_TASK_DISCARD_ALL_ARCHIVE_METHOD,
      discardArchivedTasksDto,
      (error, value) => {
        if (error) {
          reject(error)
        }
        resolve(value)
      },
    )
  })
}
