import { Meteor } from 'meteor/meteor';
import { ResumeTaskDto, ResumeTaskMethodName } from '../../api';
import { TaskPresenter } from '../presenter';

export async function resumeTaskAction(task: TaskPresenter): Promise<void> {
  return new Promise(function executor(resolve, reject) {
    Meteor.call<ResumeTaskDto>(
      ResumeTaskMethodName,
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
