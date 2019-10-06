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
    TaskRepository.saveTask(task)
  },

  [PLANNING_TASK_TICK_OFF_METHOD](taskDto: TaskDto) {
    const task = TaskRepository.getTaskById(taskDto.taskId)
    if (task) {
      task.tickOff()
      TaskRepository.updateTask(task)
    }
  },

  [PLANNING_TASK_RESUME_METHOD](taskDto: TaskDto) {
    const task = TaskRepository.getTaskById(taskDto.taskId)
    if (task) {
      task.resume()
      TaskRepository.updateTask(task)
    }
  },

  [PLANNING_TASK_EDIT_METHOD](editTaskDto: EditTaskDto) {
    const task = TaskRepository.getTaskById(editTaskDto.taskId)
    if (task) {
      const newTaskDescription = TaskDescription.create(editTaskDto.newText)
      task.edit(newTaskDescription)
      TaskRepository.updateTask(task)
    }
  },

  [PLANNING_TASK_ARCHIVE_METHOD](taskDto: TaskDto) {
    const task = TaskRepository.getTaskById(taskDto.taskId)
    if (task) {
      task.archive()
      TaskRepository.updateTask(task)
    }
  },

  [PLANNING_TASK_DISCARD_METHOD](taskDto: TaskDto) {
    const task = TaskRepository.getTaskById(taskDto.taskId)
    if (task) {
      task.discard()
      TaskRepository.updateTask(task)
    }
  },

  [PLANNING_TASK_DISCARD_ALL_ARCHIVE_METHOD](
    discardArchivedTasksDto: DiscardArchivedTasksDto,
  ) {
    const tasks = TaskRepository.getAllTasksById(
      discardArchivedTasksDto.taskIdList,
    )
    if (tasks.length) {
      tasks.forEach((task) => task.discard())
      TaskRepository.updateAllTasks(tasks)
    }
  },
})
