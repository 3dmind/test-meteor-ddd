import { Meteor } from 'meteor/meteor'
import { PLANNING_TASK_TICK_OFF_METHOD } from '../../constants'
import { TickOffTaskDto } from '../../dto'

export function tickOffTaskAction(taskId: string): Promise<void> {
  return new Promise((resolve, reject): void => {
    const tickOffTaskDto = new TickOffTaskDto(taskId)
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
