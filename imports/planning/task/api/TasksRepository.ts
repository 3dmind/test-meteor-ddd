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
