import { Meteor } from 'meteor/meteor'
import { UniqueId } from '../../../core/domain'
import {
  PLANNING_TASK_ARCHIVE_METHOD,
  PLANNING_TASK_DISCARD_ALL_ARCHIVE_METHOD,
  PLANNING_TASK_DISCARD_METHOD,
  PLANNING_TASK_EDIT_METHOD,
  PLANNING_TASK_NOTE_METHOD,
  PLANNING_TASK_RESUME_METHOD,
  PLANNING_TASK_TICK_OFF_METHOD,
} from '../constants'
import { TaskDescription } from '../domain/TaskDescription'
import { TaskEntity } from '../domain/TaskEntity'
import {
  DiscardArchivedTasksDto,
  EditTaskDto,
  NoteTaskDto,
  TaskDto,
} from '../dto'
import { UnauthorizedMethodCallException } from './exceptions'
import { TaskRepository } from './TaskRepository'

Meteor.methods({
  [PLANNING_TASK_NOTE_METHOD](dto: NoteTaskDto) {
    if (!this.userId) {
      throw new UnauthorizedMethodCallException()
    }

    const taskDescription = TaskDescription.create(dto.text)
    const ownerId = UniqueId.create(this.userId)
    const task = TaskEntity.note(taskDescription, ownerId)
    TaskRepository.saveTask(task)
  },

  [PLANNING_TASK_TICK_OFF_METHOD](dto: TaskDto) {
    const task = TaskRepository.getTaskById(dto.taskId)
    if (task) {
      task.tickOff()
      TaskRepository.updateTask(task)
    }
  },

  [PLANNING_TASK_RESUME_METHOD](dto: TaskDto) {
    const task = TaskRepository.getTaskById(dto.taskId)
    if (task) {
      task.resume()
      TaskRepository.updateTask(task)
    }
  },

  [PLANNING_TASK_EDIT_METHOD](dto: EditTaskDto) {
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

  [PLANNING_TASK_ARCHIVE_METHOD](dto: TaskDto) {
    const task = TaskRepository.getTaskById(dto.taskId)
    if (task) {
      task.archive()
      TaskRepository.updateTask(task)
    }
  },

  [PLANNING_TASK_DISCARD_METHOD](dto: TaskDto) {
    const task = TaskRepository.getTaskById(dto.taskId)
    if (task) {
      task.discard()
      TaskRepository.updateTask(task)
    }
  },

  [PLANNING_TASK_DISCARD_ALL_ARCHIVE_METHOD](dto: DiscardArchivedTasksDto) {
    const tasks = TaskRepository.getAllTasksById(dto.taskIds)
    if (tasks.length) {
      tasks.forEach((task) => task.discard())
      TaskRepository.updateAllTasks(tasks)
    }
  },
})
