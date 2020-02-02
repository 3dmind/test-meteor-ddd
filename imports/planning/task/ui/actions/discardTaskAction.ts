import { Meteor } from 'meteor/meteor';
import { DiscardTaskDto, DiscardTaskMethodName } from '../../api';
import { TaskPresenter } from '../presenter';

export async function discardTaskAction(task: TaskPresenter): Promise<void> {
  return new Promise(function executor(resolve, reject) {
    Meteor.call<DiscardTaskDto>(
      DiscardTaskMethodName,
      { taskId: task.id },
      function callback(error, value) {
        if (error) {
          reject(error);
        }
        resolve(value);
      },
    );
  });
}
