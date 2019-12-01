import { Meteor } from 'meteor/meteor'
import { Random } from 'meteor/random'
import { TaskDescription, TaskEntity, UniqueId } from '../../../domain'
import { UnauthorizedMethodCallException } from '../../exceptions'
import { TaskRepository } from '../../TaskRepository'
import { NoteTaskDTO } from './NoteTaskDTO'
import { NoteTaskMethodName } from './NoteTaskMethodName'

Meteor.methods({
  [NoteTaskMethodName]: function noteTaskMethod(dto: NoteTaskDTO): void {
    if (!this.userId) {
      throw new UnauthorizedMethodCallException()
    }

    const taskDescription = TaskDescription.create(dto.text)
    const ownerId = UniqueId.create(this.userId)
    const taskId = UniqueId.create(Random.id())
    const task = TaskEntity.note(taskId, taskDescription, ownerId)
    TaskRepository.saveTask(task)
  },
})
