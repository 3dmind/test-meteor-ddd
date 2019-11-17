import { Meteor } from 'meteor/meteor'
import { UniqueId } from '../../domain'
import { TaskDto } from '../../dto'
import { MethodNamesEnum } from '../../enums'
import {
  TaskNotFoundException,
  UnauthorizedMethodCallException,
  UnauthorizedTaskOperationException,
} from '../exceptions'
import { TaskRepository } from '../TaskRepository'

Meteor.methods({
  [MethodNamesEnum.ArchiveTask]: function archiveTaskMethod(
    dto: TaskDto,
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
