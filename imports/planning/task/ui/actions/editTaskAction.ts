import { Meteor } from 'meteor/meteor'
import { PLANNING_TASK_EDIT_METHOD } from '../../constants'
import { EditTaskDto } from '../../dto'

export function editTaskAction(taskId: string, text: string): Promise<void> {
  return new Promise((resolve, reject): void => {
    const editTaskDto = new EditTaskDto(taskId, text)
    Meteor.call(PLANNING_TASK_EDIT_METHOD, editTaskDto, (error, value) => {
      if (error) {
        reject(error)
      }
      resolve(value)
    })
  })
}
