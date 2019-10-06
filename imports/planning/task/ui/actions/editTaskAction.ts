import { Meteor } from 'meteor/meteor'
import { PLANNING_TASK_EDIT_METHOD } from '../../constants'
import { EditTaskDto } from '../../dto'
import { TaskUiModel } from '../TaskUiModel'

export function editTaskAction(task: TaskUiModel, text: string): Promise<void> {
  return new Promise((resolve, reject): void => {
    const editTaskDto = new EditTaskDto(task, text)
    Meteor.call(PLANNING_TASK_EDIT_METHOD, editTaskDto, (error, value) => {
      if (error) {
        reject(error)
      }
      resolve(value)
    })
  })
}
