import { TaskList, UniqueId } from '../../domain'
import { TaskDocument } from '../collections'
import { TaskMapper } from './TaskMapper'

type TaskDocuments = Array<[string, TaskDocument]>

export const TaskListMapper = {
  toPersistence(taskList: TaskList): TaskDocuments {
    return taskList
      .toArray()
      .map((task) => [task.id.value, TaskMapper.toPersistence(task)])
  },

  toDomain(id: UniqueId, documents: TaskDocument[], count: number): TaskList {
    const tasks = documents.map((document) => TaskMapper.toDomain(document))
    return TaskList.create(id, { tasks, count })
  },
}
Object.freeze(TaskListMapper)
