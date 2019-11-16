import { Meteor } from 'meteor/meteor'
import { DiscardArchivedTasksDto } from '../../dto'
import { MethodNamesEnum } from '../../enums'
import { UnauthorizedMethodCallException } from '../exceptions'
import { TaskRepository } from '../TaskRepository'

Meteor.methods({
  [MethodNamesEnum.DiscardAllArchivedTasks]: function discardAllArchivedTasksMethod(
    dto: DiscardArchivedTasksDto,
  ): void {
    if (!this.userId) {
      throw new UnauthorizedMethodCallException()
    }

    const tasks = TaskRepository.getAllTasksById(dto.taskIds)
    if (tasks.length) {
      tasks.forEach((task) => task.discard())
      TaskRepository.updateAllTasks(tasks)
    }
  },
})
