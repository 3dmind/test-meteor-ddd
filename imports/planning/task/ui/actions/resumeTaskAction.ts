import { Meteor } from 'meteor/meteor'
import { PLANNING_TASK_RESUME_METHOD } from '../../constants'
import { TaskDto } from '../../dto'
import { TaskUiModel } from '../TaskUiModel'

export function resumeTaskAction(task: TaskUiModel): Promise<void> {
  return new Promise((resolve, reject): void => {
    const resumeTaskDto = new TaskDto(task)
    Meteor.call(PLANNING_TASK_RESUME_METHOD, resumeTaskDto, (error, value) => {
      if (error) {
        reject(error)
      }
      resolve(value)
    })
  })
}
