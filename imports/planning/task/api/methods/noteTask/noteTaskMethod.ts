import { Meteor } from 'meteor/meteor'
import { Task, TaskDescription, UniqueEntityID } from '../../../domain'
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
    const ownerID = UniqueEntityID.create(this.userId)
    const task = Task.note(taskDescription, ownerID)
    TaskRepository.saveTask(task)
  },
})
