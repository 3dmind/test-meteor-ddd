import { Meteor } from 'meteor/meteor'
import { EditTaskDTO, EditTaskMethodName } from '../../api'
import { TaskPresenter } from '../presenter'

export function editTaskAction(
  task: TaskPresenter,
  text: string,
): Promise<void> {
  return new Promise((resolve, reject): void => {
    Meteor.call<EditTaskDTO>(
      EditTaskMethodName,
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
