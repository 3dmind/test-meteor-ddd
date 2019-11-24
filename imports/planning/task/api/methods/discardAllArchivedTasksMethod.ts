import { Meteor } from 'meteor/meteor'
import { DiscardArchivedTasksDto } from '../../dto'
import { MethodNamesEnum } from '../../enums'
import {
  TaskNotFoundException,
  UnauthorizedMethodCallException,
} from '../exceptions'
import { TaskRepository } from '../TaskRepository'

Meteor.methods({
  [MethodNamesEnum.DiscardAllArchivedTasks]: function discardAllArchivedTasksMethod(
    dto: DiscardArchivedTasksDto,
  ): void {
    if (!this.userId) {
      throw new UnauthorizedMethodCallException()
    }

    const taskList = TaskRepository.getAllTasksById(dto.taskIds)
    if (taskList.isEmpty()) {
      throw new TaskNotFoundException('Selected tasks were not found.')
    }
    taskList.discardTasks()
    TaskRepository.updateAllTasks(taskList)
  },
})
