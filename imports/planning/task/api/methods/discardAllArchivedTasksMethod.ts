import { Meteor } from 'meteor/meteor'
import { UniqueId } from '../../domain/values'
import { MethodNamesEnum } from '../../enums'
import {
  TaskNotFoundException,
  UnauthorizedMethodCallException,
} from '../exceptions'
import { TaskRepository } from '../TaskRepository'

Meteor.methods({
  [MethodNamesEnum.DiscardAllArchivedTasks]: function discardAllArchivedTasksMethod(): void {
    if (!this.userId) {
      throw new UnauthorizedMethodCallException()
    }

    const ownerId = UniqueId.create(this.userId)
    const taskList = TaskRepository.getAllArchivedTasks(ownerId)
    if (taskList.isEmpty()) {
      throw new TaskNotFoundException('Selected tasks were not found.')
    }
    taskList.discardTasks()
    TaskRepository.updateAllTasks(taskList)
  },
})
