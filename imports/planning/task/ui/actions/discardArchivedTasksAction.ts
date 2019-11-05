import { Meteor } from 'meteor/meteor'
import { PLANNING_TASK_DISCARD_ALL_ARCHIVE_METHOD } from '../../constants'
import { DiscardArchivedTasksDto } from '../../dto'
import { TaskViewModel } from '../models'

export function discardArchivedTasksAction(
  tasks: TaskViewModel[],
): Promise<void> {
  return new Promise((resolve, reject): void => {
    const dto = {
      taskIds: tasks.map((task) => task.id),
    }
    Meteor.call<DiscardArchivedTasksDto>(
      PLANNING_TASK_DISCARD_ALL_ARCHIVE_METHOD,
      dto,
      (error, value) => {
        if (error) {
          reject(error)
        }
        resolve(value)
      },
    )
  })
}
