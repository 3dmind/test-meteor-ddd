import { TasksCollection, TaskDocument } from './api/TasksCollection'
import { TaskMapper } from './TaskMapper'
import { TaskEntity } from './domain/TaskEntity'

export const TasksRepository = {
  save(task: TaskEntity): string {
    return TasksCollection.insert(TaskMapper.toPersistence(task))
  },

  update(task: TaskEntity): number {
    return TasksCollection.update(task.id.value, {
      $set: { ...TaskMapper.toPersistence(task) },
    })
  },

  getTasks(selector: Mongo.Selector<TaskDocument> = {}): TaskEntity[] {
    return TasksCollection.find(selector).map((d: TaskDocument) =>
      TaskMapper.toDomain(d),
    )
  },

  getAllActive(): TaskEntity[] {
    const selector: Mongo.Selector<TaskDocument> = {
      isDiscarded: false,
      isArchived: false,
    }
    return this.getTasks(selector)
  },

  getAllArchived(): TaskEntity[] {
    const selector: Mongo.Selector<TaskDocument> = {
      isDiscarded: false,
      isArchived: true,
    }
    return this.getTasks(selector)
  },

  getById(taskId: string): TaskEntity | undefined {
    const d: TaskDocument = TasksCollection.findOne(taskId)
    if (d) {
      return TaskMapper.toDomain(d)
    } else {
      return undefined
    }
  },
}

Object.freeze(TasksRepository)
