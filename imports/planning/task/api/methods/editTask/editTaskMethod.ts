import { Meteor } from 'meteor/meteor';
import { UniqueEntityId } from '../../../../../core/domain';
import { TaskDescription } from '../../../domain';
import {
  TaskNotFoundException,
  UnauthorizedMethodCallException,
  UnauthorizedTaskOperationException,
} from '../../exceptions';
import { TaskRepository } from '../../TaskRepository';
import { EditTaskDTO } from './EditTaskDTO';
import { EditTaskMethodName } from './EditTaskMethodName';

Meteor.methods({
  [EditTaskMethodName]: function editTaskMethod(dto: EditTaskDTO): void {
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
    const newTaskDescription = TaskDescription.create(dto.newText);
    task.edit(newTaskDescription);
    TaskRepository.updateTask(task);
  },
});
