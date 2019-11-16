import { TaskEntity } from '../domain/TaskEntity'
import { TaskCollection, TaskDocument } from './TaskCollection'
import { TaskMapper } from './TaskMapper'

export const TaskRepository = {
  saveTask(task: TaskEntity): string {
    return TaskCollection.insert(TaskMapper.toPersistence(task))
  },

  updateTask(task: TaskEntity): number {
    return TaskCollection.update(task.id.value, {
      $set: { ...TaskMapper.toPersistence(task) },
    })
  },

  updateAllTasks(tasks: TaskEntity[]): number {
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

  getTaskById(taskId: string): TaskEntity | undefined {
    const document: TaskDocument = TaskCollection.findOne(taskId)
    if (document) {
      return TaskMapper.toDomain(document)
    } else {
      return undefined
    }
  },

  getAllTasksById(ids: string[]): TaskEntity[] | undefined {
    const tasks = TaskCollection.find({ _id: { $in: ids } }).map((document) =>
      TaskMapper.toDomain(document),
    )
    if (tasks) {
      return tasks
    } else {
      return undefined
    }
  },
}

Object.freeze(TaskRepository)
