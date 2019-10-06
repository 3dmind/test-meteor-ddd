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
  [PLANNING_TASK_NOTE_METHOD](noteTaskDto: NoteTaskDto) {
    const taskDescription = TaskDescription.create(noteTaskDto.text)
    const task = TaskEntity.note(taskDescription)
    TaskRepository.save(task)
  },

  [PLANNING_TASK_TICK_OFF_METHOD](taskDto: TaskDto) {
    const task = TaskRepository.getById(taskDto.taskId)
    if (task) {
      task.tickOff()
      TaskRepository.update(task)
    }
  },

  [PLANNING_TASK_RESUME_METHOD](taskDto: TaskDto) {
    const task = TaskRepository.getById(taskDto.taskId)
    if (task) {
      task.resume()
      TaskRepository.update(task)
    }
  },

  [PLANNING_TASK_EDIT_METHOD](editTaskDto: EditTaskDto) {
    const task = TaskRepository.getById(editTaskDto.taskId)
    if (task) {
      const newTaskDescription = TaskDescription.create(editTaskDto.newText)
      task.edit(newTaskDescription)
      TaskRepository.update(task)
    }
  },

  [PLANNING_TASK_ARCHIVE_METHOD](taskDto: TaskDto) {
    const task = TaskRepository.getById(taskDto.taskId)
    if (task) {
      task.archive()
      TaskRepository.update(task)
    }
  },

  [PLANNING_TASK_DISCARD_METHOD](taskDto: TaskDto) {
    const task = TaskRepository.getById(taskDto.taskId)
    if (task) {
      task.discard()
      TaskRepository.update(task)
    }
  },

  [PLANNING_TASK_DISCARD_ALL_ARCHIVE_METHOD](
    discardArchivedTasksDto: DiscardArchivedTasksDto,
  ) {
    const tasks = TaskRepository.getAllById(discardArchivedTasksDto.taskIdList)
    if (tasks.length) {
      tasks.forEach((task) => task.discard())
      TaskRepository.updateAll(tasks)
    }
  },
})
