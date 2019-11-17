import { Meteor } from 'meteor/meteor'
import { UniqueId } from '../../../../core/domain'
import { TaskDescription } from '../../domain/TaskDescription'
import { EditTaskDto } from '../../dto'
import { MethodNamesEnum } from '../../enums'
import {
  TaskNotFoundException,
  UnauthorizedMethodCallException,
  UnauthorizedTaskOperationException,
} from '../exceptions'
import { TaskRepository } from '../TaskRepository'

Meteor.methods({
  [MethodNamesEnum.EditTask]: function editTaskMethod(dto: EditTaskDto): void {
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
    const newTaskDescription = TaskDescription.create(dto.newText)
    task.edit(newTaskDescription)
    TaskRepository.updateTask(task)
  },
})
