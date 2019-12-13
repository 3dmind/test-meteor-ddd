import { Meteor } from 'meteor/meteor'
import { EditTaskDTO, EditTaskMethodName } from '../../api'
import { TaskPresenter } from '../presenter'

export async function editTaskAction(
  task: TaskPresenter,
  text: string,
): Promise<void> {
  return new Promise(function executor(resolve, reject) {
    Meteor.call<EditTaskDTO>(
      EditTaskMethodName,
      {
        taskId: task.id,
        newText: text,
      },
      function callback(error, value) {
        if (error) {
          reject(error)
        }
        resolve(value)
      },
    )
  })
}
