import { Meteor } from 'meteor/meteor'
import {
  PLANNING_TASK_ARCHIVE_METHOD,
  PLANNING_TASK_DISCARD_METHOD,
  PLANNING_TASK_NOTE_METHOD,
  PLANNING_TASK_RESUME_METHOD,
  PLANNING_TASK_TICK_OFF_METHOD,
} from '../constants'
import { TaskDescription } from '../domain/TaskDescription'
import { TaskEntity } from '../domain/TaskEntity'
import {
  ArchiveTaskDto,
  DiscardTaskDto,
  NoteTaskDto,
  ResumeTaskDto,
  TickOffTaskDto,
} from '../dto'
import { TasksRepository } from './TasksRepository'

Meteor.methods({
  [PLANNING_TASK_NOTE_METHOD](noteTaskDto: NoteTaskDto) {
    const taskDescription = TaskDescription.create(noteTaskDto.text)
    const task = TaskEntity.note(taskDescription)
    TasksRepository.save(task)
  },

  [PLANNING_TASK_TICK_OFF_METHOD](tickOffTaskDto: TickOffTaskDto) {
    const task = TasksRepository.getById(tickOffTaskDto.taskId)
    if (task) {
      task.tickOff()
      TasksRepository.update(task)
    }
  },

  [PLANNING_TASK_RESUME_METHOD](resumeTaskDto: ResumeTaskDto) {
    const task = TasksRepository.getById(resumeTaskDto.taskId)
    if (task) {
      task.resume()
      TasksRepository.update(task)
    }
  },

  [PLANNING_TASK_ARCHIVE_METHOD](archiveTaskDto: ArchiveTaskDto) {
    const task = TasksRepository.getById(archiveTaskDto.taskId)
    if (task) {
      task.archive()
      TasksRepository.update(task)
    }
  },

  [PLANNING_TASK_DISCARD_METHOD](discardTaskDto: DiscardTaskDto) {
    const task = TasksRepository.getById(discardTaskDto.taskId)
    if (task) {
      task.discard()
      TasksRepository.update(task)
    }
  },
})
