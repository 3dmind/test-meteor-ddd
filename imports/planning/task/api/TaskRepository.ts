import { Task, TaskList, UniqueEntityID } from '../domain'
import { TaskCollection, TaskDocument } from './collections'
import { TaskListMapper, TaskMapper } from './mappers'

export const TaskRepository = {
  saveTask(task: Task): string {
    return TaskCollection.insert(TaskMapper.toPersistence(task))
  },

  updateTask(task: Task): number {
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

  getTaskById(taskId: string): Task | undefined {
    const document: TaskDocument = TaskCollection.findOne(taskId)
    if (document) {
      return TaskMapper.toDomain(document)
    } else {
      return undefined
    }
  },

  getAllArchivedTasks(ownerID: UniqueEntityID): TaskList {
    const selector: Mongo.Selector<TaskDocument> = {
      ownerId: ownerID.value,
      isArchived: true,
    }
    const cursor = TaskCollection.find(selector)
    const count = cursor.count()
    const documents = cursor.fetch()
    return TaskListMapper.toDomain(documents, count)
  },
}

Object.freeze(TaskRepository)
