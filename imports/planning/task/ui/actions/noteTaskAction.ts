import { Meteor } from 'meteor/meteor';
import { NoteTaskDto, NoteTaskMethodName } from '../../api';

export async function noteTaskAction(text: string): Promise<void> {
  return new Promise(function executor(resolve, reject) {
    Meteor.call<NoteTaskDto>(NoteTaskMethodName, { text }, function callback(
      error,
      value,
    ) {
      if (error) {
        reject(error);
      }
      resolve(value);
    });
  });
}
