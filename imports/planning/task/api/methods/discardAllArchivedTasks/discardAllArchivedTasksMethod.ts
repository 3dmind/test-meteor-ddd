import { Meteor } from 'meteor/meteor';
import { UniqueEntityId } from '../../../../../core/domain';
import {
  TaskNotFoundException,
  UnauthorizedMethodCallException,
} from '../../exceptions';
import { TaskRepository } from '../../TaskRepository';
import { DiscardAllArchivedTasksMethodName } from './DiscardAllArchivedTasksMethodName';

Meteor.methods({
  [DiscardAllArchivedTasksMethodName]: function discardAllArchivedTasksMethod(): void {
    if (!this.userId) {
      throw new UnauthorizedMethodCallException();
    }

    const ownerId = UniqueEntityId.create(this.userId);
    const taskList = TaskRepository.getAllArchivedTasks(ownerId);
    if (taskList.isEmpty()) {
      throw new TaskNotFoundException('Selected tasks were not found.');
    }
    taskList.discardTasks();
    TaskRepository.updateAllTasks(taskList);
  },
});
