import { Meteor } from 'meteor/meteor'
import { UniqueId } from '../../../domain'
import {
  TaskNotFoundException,
  UnauthorizedMethodCallException,
  UnauthorizedTaskOperationException,
} from '../../exceptions'
import { TaskRepository } from '../../TaskRepository'
import { ResumeTaskDTO } from './ResumeTaskDTO'
import { ResumeTaskMethodName } from './ResumeTaskMethodName'

Meteor.methods({
  [ResumeTaskMethodName]: function resumeTaskMethod(dto: ResumeTaskDTO): void {
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
    task.resume()
    TaskRepository.updateTask(task)
  },
})