import { Meteor } from 'meteor/meteor'
import { DiscardArchivedTasksDto } from '../../dto'
import { MethodNamesEnum } from '../../enums'
import { TaskPresenter } from '../presenter'

export function discardArchivedTasksAction(
  tasks: TaskPresenter[],
): Promise<void> {
  return new Promise((resolve, reject): void => {
    const dto = {
      taskIds: tasks.map((task) => task.id),
    }
    Meteor.call<DiscardArchivedTasksDto>(
      MethodNamesEnum.DiscardAllArchivedTasks,
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
