import { TasksCollection, TaskDocument } from './TasksCollection'
import { TaskMapper } from './TaskMapper'
import { TaskEntity } from '../domain/TaskEntity'

export const TasksRepository = {
  save(task: TaskEntity): string {
    return TasksCollection.insert(TaskMapper.toPersistence(task))
  },

  update(task: TaskEntity): number {
    return TasksCollection.update(task.id.value, {
      $set: { ...TaskMapper.toPersistence(task) },
    })
  },

  updateAll(tasks: TaskEntity[]): number {
    try {
      return tasks.map((task) =>
        TasksCollection.update(task.id.value, {
          $set: { ...TaskMapper.toPersistence(task) },
        }),
      ).length
    } catch (e) {
      return 0
    }
  },

  getById(taskId: string): TaskEntity | undefined {
    const d: TaskDocument = TasksCollection.findOne(taskId)
    if (d) {
      return TaskMapper.toDomain(d)
    } else {
      return undefined
    }
  },

  getAllById(ids: string[]): TaskEntity[] | undefined {
    const tasks = TasksCollection.find({ _id: { $in: ids } }).map((d) =>
      TaskMapper.toDomain(d),
    )
    if (tasks) {
      return tasks
    } else {
      return undefined
    }
  },
}

Object.freeze(TasksRepository)
