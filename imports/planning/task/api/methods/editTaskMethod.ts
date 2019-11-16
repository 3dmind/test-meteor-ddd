import { Meteor } from 'meteor/meteor'
import { TaskDescription } from '../../domain/TaskDescription'
import { EditTaskDto } from '../../dto'
import { MethodNamesEnum } from '../../enums'
import { UnauthorizedMethodCallException } from '../exceptions'
import { TaskRepository } from '../TaskRepository'

Meteor.methods({
  [MethodNamesEnum.EditTask]: function editTaskMethod(dto: EditTaskDto): void {
    if (!this.userId) {
      throw new UnauthorizedMethodCallException()
    }

    const task = TaskRepository.getTaskById(dto.taskId)
    if (task) {
      const newTaskDescription = TaskDescription.create(dto.newText)
      task.edit(newTaskDescription)
      TaskRepository.updateTask(task)
    }
  },
})
