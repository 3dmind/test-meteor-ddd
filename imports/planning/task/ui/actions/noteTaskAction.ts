import { Meteor } from 'meteor/meteor'
import { NoteTaskDto } from '../../dto'
import { MethodNamesEnum } from '../../enums'

export function noteTaskAction(text: string): Promise<void> {
  return new Promise((resolve, reject): void => {
    Meteor.call<NoteTaskDto>(
      MethodNamesEnum.NoteTask,
      { text },
      (error, value) => {
        if (error) {
          reject(error)
        }
        resolve(value)
      },
    )
  })
}
