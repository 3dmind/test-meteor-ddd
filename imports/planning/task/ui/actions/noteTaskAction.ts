import { Meteor } from 'meteor/meteor'
import { NoteTaskDTO, NoteTaskMethodName } from '../../api'

export async function noteTaskAction(text: string): Promise<void> {
  return new Promise(function executor(resolve, reject) {
    Meteor.call<NoteTaskDTO>(NoteTaskMethodName, { text }, function callback(
      error,
      value,
    ) {
      if (error) {
        reject(error)
      }
      resolve(value)
    })
  })
}
