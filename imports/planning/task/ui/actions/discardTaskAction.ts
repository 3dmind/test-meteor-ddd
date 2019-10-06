import { Meteor } from 'meteor/meteor'
import { PLANNING_TASK_DISCARD_METHOD } from '../../constants'
import { TaskDto } from '../../dto'
import { TaskUiModel } from '../TaskUiModel'

export function discardTaskAction(task: TaskUiModel): Promise<void> {
  return new Promise((resolve, reject): void => {
    const discardTaskDto = new TaskDto(task)
    Meteor.call(
      PLANNING_TASK_DISCARD_METHOD,
      discardTaskDto,
      (error, value) => {
        if (error) {
          reject(error)
        }
        resolve(value)
      },
    )
  })
}
