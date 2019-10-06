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
import { TasksRepository } from './TasksRepository'

Meteor.methods({
  [PLANNING_TASK_NOTE_METHOD](noteTaskDto: NoteTaskDto) {
    const taskDescription = TaskDescription.create(noteTaskDto.text)
    const task = TaskEntity.note(taskDescription)
    TasksRepository.save(task)
  },

  [PLANNING_TASK_TICK_OFF_METHOD](taskDto: TaskDto) {
    const task = TasksRepository.getById(taskDto.taskId)
    if (task) {
      task.tickOff()
      TasksRepository.update(task)
    }
  },

  [PLANNING_TASK_RESUME_METHOD](taskDto: TaskDto) {
    const task = TasksRepository.getById(taskDto.taskId)
    if (task) {
      task.resume()
      TasksRepository.update(task)
    }
  },

  [PLANNING_TASK_EDIT_METHOD](editTaskDto: EditTaskDto) {
    const task = TasksRepository.getById(editTaskDto.taskId)
    if (task) {
      const newTaskDescription = TaskDescription.create(editTaskDto.newText)
      task.edit(newTaskDescription)
      TasksRepository.update(task)
    }
  },

  [PLANNING_TASK_ARCHIVE_METHOD](taskDto: TaskDto) {
    const task = TasksRepository.getById(taskDto.taskId)
    if (task) {
      task.archive()
      TasksRepository.update(task)
    }
  },

  [PLANNING_TASK_DISCARD_METHOD](taskDto: TaskDto) {
    const task = TasksRepository.getById(taskDto.taskId)
    if (task) {
      task.discard()
      TasksRepository.update(task)
    }
  },

  [PLANNING_TASK_DISCARD_ALL_ARCHIVE_METHOD](
    discardArchivedTasksDto: DiscardArchivedTasksDto,
  ) {
    const tasks = TasksRepository.getAllById(discardArchivedTasksDto.taskIdList)
    if (tasks.length) {
      tasks.forEach((task) => task.discard())
      TasksRepository.updateAll(tasks)
    }
  },
})
