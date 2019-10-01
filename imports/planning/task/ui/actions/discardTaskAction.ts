import { Meteor } from 'meteor/meteor'
import { PLANNING_TASK_DISCARD_METHOD } from '../../constants'
import { DiscardTaskDto } from '../../dto'

export function discardTaskAction(taskId: string): Promise<void> {
  return new Promise((resolve, reject): void => {
    const discardTaskDto = new DiscardTaskDto(taskId)
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
