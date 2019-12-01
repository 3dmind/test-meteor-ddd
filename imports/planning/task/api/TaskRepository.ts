import { Random } from 'meteor/random'
import { TaskEntity, TaskList, UniqueId } from '../domain'
import { TaskListMapper, TaskMapper } from './mappers'
import { TaskCollection, TaskDocument } from './collections'

export const TaskRepository = {
  saveTask(task: TaskEntity): string {
    return TaskCollection.insert(TaskMapper.toPersistence(task))
  },

  updateTask(task: TaskEntity): number {
    return TaskCollection.update(task.id.value, {
      $set: { ...TaskMapper.toPersistence(task) },
    })
  },

  updateAllTasks(taskList: TaskList): number {
    const taskDocuments = TaskListMapper.toPersistence(taskList)
    try {
      return taskDocuments.map(([taskId, document]) =>
        TaskCollection.update(taskId, {
          $set: { ...document },
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

  getAllArchivedTasks(ownerId: UniqueId): TaskList {
    const selector: Mongo.Selector<TaskDocument> = {
      ownerId: ownerId.value,
      isArchived: true,
    }
    const cursor = TaskCollection.find(selector)
    const count = cursor.count()
    const documents = cursor.fetch()
    const id = UniqueId.create(Random.id())
    return TaskListMapper.toDomain(id, documents, count)
  },
}

Object.freeze(TaskRepository)
