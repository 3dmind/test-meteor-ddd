import { Meteor } from 'meteor/meteor'
import { TaskDto } from '../../dto'
import { MethodNamesEnum } from '../../enums'
import { TaskNotFoundException } from '../exceptions'
import { TaskRepository } from '../TaskRepository'

Meteor.methods({
  [MethodNamesEnum.TickOffTask]: function tickOffTaskMethod(
    dto: TaskDto,
  ): void {
    const task = TaskRepository.getTaskById(dto.taskId)
    if (!task) {
      throw new TaskNotFoundException()
    }
    task.tickOff()
    TaskRepository.updateTask(task)
  },
})
