import { Meteor } from 'meteor/meteor';

interface SignInAction {
  username: string;
  password: string;
}

export async function signInAction({
  username,
  password,
}: SignInAction): Promise<void> {
  return new Promise(function executor(resolve, reject): void {
    Meteor.loginWithPassword(username, password, function callback(error) {
      if (error) {
        reject(error);
      }
      resolve();
    });
  });
}
