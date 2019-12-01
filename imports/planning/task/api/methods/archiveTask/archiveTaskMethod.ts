import { Meteor } from 'meteor/meteor'
import { UniqueId } from '../../../domain'
import {
  TaskNotFoundException,
  UnauthorizedMethodCallException,
  UnauthorizedTaskOperationException,
} from '../../exceptions'
import { TaskRepository } from '../../TaskRepository'
import { ArchiveTaskDTO } from './ArchiveTaskDTO'
import { ArchiveTaskMethodName } from './ArchiveTaskMethodName'

Meteor.methods({
  [ArchiveTaskMethodName]: function archiveTaskMethod(
    dto: ArchiveTaskDTO,
  ): void {
    if (!this.userId) {
      throw new UnauthorizedMethodCallException()
    }

    const task = TaskRepository.getTaskById(dto.taskId)
    if (!task) {
      throw new TaskNotFoundException()
    }
    if (!task.isOwnedByUser(UniqueId.create(this.userId))) {
      throw new UnauthorizedTaskOperationException()
    }
    task.archive()
    TaskRepository.updateTask(task)
  },
})