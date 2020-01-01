import { Meteor } from 'meteor/meteor'
import { UniqueEntityID } from '../../../../../core/domain'
import {
  TaskNotFoundException,
  UnauthorizedMethodCallException,
  UnauthorizedTaskOperationException,
} from '../../exceptions'
import { TaskRepository } from '../../TaskRepository'
import { TickOffTaskDTO } from './TickOffTaskDTO'
import { TickOffTaskMethodName } from './TickOffTaskMethodName'

Meteor.methods({
  [TickOffTaskMethodName]: function tickOffTaskMethod(
    dto: TickOffTaskDTO,
  ): void {
    if (!this.userId) {
      throw new UnauthorizedMethodCallException()
    }

    const task = TaskRepository.getTaskById(dto.taskId)
    if (!task) {
      throw new TaskNotFoundException()
    }
    if (!task.isOwnedByUser(UniqueEntityID.create(this.userId))) {
      throw new UnauthorizedTaskOperationException()
    }
    task.tickOff()
    TaskRepository.updateTask(task)
  },
})
