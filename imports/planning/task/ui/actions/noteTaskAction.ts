import { Meteor } from 'meteor/meteor'
import { PLANNING_TASK_NOTE_METHOD } from '../../constants'

export function noteTaskAction(text: string): Promise<void> {
  return new Promise((resolve, reject): void => {
    Meteor.call(PLANNING_TASK_NOTE_METHOD, text, (error, value) => {
      if (error) {
        reject(error)
      }
      resolve(value)
    })
  })
}
