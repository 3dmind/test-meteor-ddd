import { Meteor } from 'meteor/meteor'
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
import { TaskRepository } from './TaskRepository'

Meteor.methods({
  [PLANNING_TASK_NOTE_METHOD](dto: NoteTaskDto) {
    const taskDescription = TaskDescription.create(dto.text)
    const task = TaskEntity.note(taskDescription)
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
