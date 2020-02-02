import { Meteor } from 'meteor/meteor';

export async function signOutAction(): Promise<void> {
  return new Promise(function executor(resolve, reject): void {
    Meteor.logout(function callback(error) {
      if (error) {
        reject(error);
      }
      resolve();
    });
  });
}
