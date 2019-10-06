import { TaskCollection, TaskDocument } from './TaskCollection'
import { TaskMapper } from './TaskMapper'
import { TaskEntity } from '../domain/TaskEntity'

export const TaskRepository = {
  save(task: TaskEntity): string {
    return TaskCollection.insert(TaskMapper.toPersistence(task))
  },

  update(task: TaskEntity): number {
    return TaskCollection.update(task.id.value, {
      $set: { ...TaskMapper.toPersistence(task) },
    })
  },

  updateAll(tasks: TaskEntity[]): number {
    try {
      return tasks.map((task) =>
        TaskCollection.update(task.id.value, {
          $set: { ...TaskMapper.toPersistence(task) },
        }),
      ).length
    } catch (e) {
      return 0
    }
  },

  getById(taskId: string): TaskEntity | undefined {
    const d: TaskDocument = TaskCollection.findOne(taskId)
    if (d) {
      return TaskMapper.toDomain(d)
    } else {
      return undefined
    }
  },

  getAllById(ids: string[]): TaskEntity[] | undefined {
    const tasks = TaskCollection.find({ _id: { $in: ids } }).map((d) =>
      TaskMapper.toDomain(d),
    )
    if (tasks) {
      return tasks
    } else {
      return undefined
    }
  },
}

Object.freeze(TaskRepository)
