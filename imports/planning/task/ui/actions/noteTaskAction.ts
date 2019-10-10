import { Meteor } from 'meteor/meteor'
import { PLANNING_TASK_NOTE_METHOD } from '../../constants'
import { NoteTaskDto } from '../../dto'

export function noteTaskAction(text: string): Promise<void> {
  return new Promise((resolve, reject): void => {
    const dto: NoteTaskDto = { text }
    Meteor.call(PLANNING_TASK_NOTE_METHOD, dto, (error, value) => {
      if (error) {
        reject(error)
      }
      resolve(value)
    })
  })
}
