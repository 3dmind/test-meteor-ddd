import { Meteor } from 'meteor/meteor'
import { PLANNING_TASK_EDIT_METHOD } from '../../constants'
import { EditTaskDto } from '../../dto'
import { TaskUiModel } from '../models'

export function editTaskAction(task: TaskUiModel, text: string): Promise<void> {
  return new Promise((resolve, reject): void => {
    Meteor.call<EditTaskDto>(
      PLANNING_TASK_EDIT_METHOD,
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
