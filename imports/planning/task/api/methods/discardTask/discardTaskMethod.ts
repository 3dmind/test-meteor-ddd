import { Meteor } from 'meteor/meteor';
import { UniqueEntityId } from '../../../../../core/domain';
import {
  TaskNotFoundException,
  UnauthorizedMethodCallException,
  UnauthorizedTaskOperationException,
} from '../../exceptions';
import { TaskRepository } from '../../TaskRepository';
import { DiscardTaskDTO } from './DiscardTaskDTO';
import { DiscardTaskMethodName } from './DiscardTaskMethodName';

Meteor.methods({
  [DiscardTaskMethodName]: function discardTaskMethod(
    dto: DiscardTaskDTO,
  ): void {
    if (!this.userId) {
      throw new UnauthorizedMethodCallException();
    }

    const task = TaskRepository.getTaskById(dto.taskId);
    if (!task) {
      throw new TaskNotFoundException();
    }
    if (!task.isOwnedByUser(UniqueEntityId.create(this.userId))) {
      throw new UnauthorizedTaskOperationException();
    }
    task.discard();
    TaskRepository.updateTask(task);
  },
});
