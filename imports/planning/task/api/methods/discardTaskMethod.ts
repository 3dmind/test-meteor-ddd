import { Meteor } from 'meteor/meteor'
import { TaskDto } from '../../dto'
import { MethodNamesEnum } from '../../enums'
import {
  TaskNotFoundException,
  UnauthorizedMethodCallException,
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
    task.discard()
    TaskRepository.updateTask(task)
  },
})
