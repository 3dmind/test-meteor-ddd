import { Meteor } from 'meteor/meteor'
import { Random } from 'meteor/random'
import { TaskDescription, TaskEntity, UniqueId } from '../../domain'
import { NoteTaskDto } from '../../dto'
import { MethodNamesEnum } from '../../enums'
import { UnauthorizedMethodCallException } from '../exceptions'
import { TaskRepository } from '../TaskRepository'

Meteor.methods({
  [MethodNamesEnum.NoteTask]: function noteTaskMethod(dto: NoteTaskDto): void {
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
