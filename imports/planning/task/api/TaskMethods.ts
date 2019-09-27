import { Meteor } from 'meteor/meteor'
import { TaskEntity } from '../domain/TaskEntity'
import { TaskDescription } from '../domain/TaskDescription'
import { TasksRepository } from '../TasksRepository'
import {
  PLANNING_TASK_NOTE_METHOD,
  PLANNING_TASK_TICK_OFF_METHOD,
  PLANNING_TASK_RESUME_METHOD,
  PLANNING_TASK_DISCARD_METHOD,
  PLANNING_TASK_ARCHIVE_METHOD,
} from '../constants'

Meteor.methods({
  [PLANNING_TASK_NOTE_METHOD](text: string) {
    TasksRepository.save(TaskEntity.note(TaskDescription.create(text)))
  },

  [PLANNING_TASK_TICK_OFF_METHOD](taskId: string) {
    const task = TasksRepository.getById(taskId)
    if (task) {
      task.tickOff()
      TasksRepository.update(task)
    }
  },

  [PLANNING_TASK_RESUME_METHOD](taskId: string) {
    const task = TasksRepository.getById(taskId)
    if (task) {
      task.resume()
      TasksRepository.update(task)
    }
  },

  [PLANNING_TASK_ARCHIVE_METHOD](taskId: string) {
    const task = TasksRepository.getById(taskId)
    if (task) {
      task.archive()
      TasksRepository.update(task)
    }
  },

  [PLANNING_TASK_DISCARD_METHOD](taskId: string) {
    const task = TasksRepository.getById(taskId)
    if (task) {
      task.discard()
      TasksRepository.update(task)
    }
  },
})
