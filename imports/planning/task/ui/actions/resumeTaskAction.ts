import { Meteor } from 'meteor/meteor'
import { PLANNING_TASK_RESUME_METHOD } from '../../constants'
import { ResumeTaskDto } from '../../dto'

export function resumeTaskAction(taskId: string): Promise<void> {
  return new Promise((resolve, reject): void => {
    const resumeTaskDto = new ResumeTaskDto(taskId)
    Meteor.call(PLANNING_TASK_RESUME_METHOD, resumeTaskDto, (error, value) => {
      if (error) {
        reject(error)
      }
      resolve(value)
    })
  })
}
