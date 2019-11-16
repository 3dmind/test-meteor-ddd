import { Meteor } from 'meteor/meteor'
import { EditTaskDto } from '../../dto'
import { MethodNamesEnum } from '../../enums'
import { TaskPresenter } from '../presenter'

export function editTaskAction(
  task: TaskPresenter,
  text: string,
): Promise<void> {
  return new Promise((resolve, reject): void => {
    Meteor.call<EditTaskDto>(
      MethodNamesEnum.EditTask,
      {
        taskId: task.id,
        newText: text,
      },
      (error, value) => {
        if (error) {
          reject(error)
        }
        resolve(value)
      },
    )
  })
}
