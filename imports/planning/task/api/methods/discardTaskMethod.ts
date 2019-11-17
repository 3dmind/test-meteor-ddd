import { Meteor } from 'meteor/meteor'
import { UniqueId } from '../../../../core/domain'
import { TaskDto } from '../../dto'
import { MethodNamesEnum } from '../../enums'
import {
  TaskNotFoundException,
  UnauthorizedMethodCallException,
  UnauthorizedTaskOperationException,
} from '../exceptions'
import { TaskRepository } from '../TaskRepository'

Meteor.methods({
  [MethodNamesEnum.DiscardTask]: function discardTaskMethod(
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
    task.discard()
    TaskRepository.updateTask(task)
  },
})
