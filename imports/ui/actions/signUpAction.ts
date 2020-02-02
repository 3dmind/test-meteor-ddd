import { Accounts } from 'meteor/accounts-base';

interface SignUpAction {
  username: string;
  password: string;
}

export async function signUpAction({
  password,
  username,
}: SignUpAction): Promise<void> {
  return new Promise(function executor(resolve, reject) {
    Accounts.createUser({ password, username }, function callback(error) {
      if (error) {
        reject(error);
      }
      resolve();
    });
  });
}
