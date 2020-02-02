import { Meteor } from 'meteor/meteor';
import { DiscardAllArchivedTasksMethodName } from '../../api';

export async function discardAllArchivedTasksAction(): Promise<void> {
  return new Promise(function executor(resolve, reject) {
    Meteor.call(DiscardAllArchivedTasksMethodName, function callback(
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
