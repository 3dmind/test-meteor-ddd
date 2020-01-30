import { Meteor } from 'meteor/meteor';
import { UniqueEntityId } from '../../../../../core/domain';
import { Task, TaskDescription } from '../../../domain';
import { UnauthorizedMethodCallException } from '../../exceptions';
import { TaskRepository } from '../../TaskRepository';
import { NoteTaskDTO } from './NoteTaskDTO';
import { NoteTaskMethodName } from './NoteTaskMethodName';

Meteor.methods({
  [NoteTaskMethodName]: function noteTaskMethod(dto: NoteTaskDTO): void {
    if (!this.userId) {
      throw new UnauthorizedMethodCallException();
    }

    const taskDescription = TaskDescription.create(dto.text);
    const ownerID = UniqueEntityId.create(this.userId);
    const task = Task.note(taskDescription, ownerID);
    TaskRepository.saveTask(task);
  },
});
