import { Random } from 'meteor/random'
import { TaskEntity, TaskList, UniqueId } from '../domain'
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

  updateAllTasks(taskList: TaskList): number {
    try {
      return taskList.toArray().map((task) =>
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

  getAllArchivedTasks(ownerId: UniqueId): TaskList {
    const selector: Mongo.Selector<TaskDocument> = {
      ownerId: ownerId.value,
      isArchived: true,
    }
    const cursor = TaskCollection.find(selector)
    const count = cursor.count()
    const tasks = cursor.map((document) => TaskMapper.toDomain(document))
    const id = UniqueId.create(Random.id())
    return TaskList.create(id, { count, tasks })
  },
}

Object.freeze(TaskRepository)
