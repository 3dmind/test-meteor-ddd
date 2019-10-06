import { Meteor } from 'meteor/meteor'
import { PLANNING_TASK_TICK_OFF_METHOD } from '../../constants'
import { TaskDto } from '../../dto'
import { TaskUiModel } from '../TaskUiModel'

export function tickOffTaskAction(task: TaskUiModel): Promise<void> {
  return new Promise((resolve, reject): void => {
    const tickOffTaskDto = new TaskDto(task)
    Meteor.call(
      PLANNING_TASK_TICK_OFF_METHOD,
      tickOffTaskDto,
      (error, value) => {
        if (error) {
          reject(error)
        }
        resolve(value)
      },
    )
  })
}
