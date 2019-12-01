import { Meteor } from 'meteor/meteor'
import { NoteTaskDTO, NoteTaskMethodName } from '../../api'

export function noteTaskAction(text: string): Promise<void> {
  return new Promise((resolve, reject): void => {
    Meteor.call<NoteTaskDTO>(NoteTaskMethodName, { text }, (error, value) => {
      if (error) {
        reject(error)
      }
      resolve(value)
    })
  })
}
