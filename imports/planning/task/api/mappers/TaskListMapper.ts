import { TaskList } from '../../domain'
import { TaskDocument } from '../collections'
import { TaskMapper } from './TaskMapper'

type TaskDocuments = Array<[string, TaskDocument]>

export const TaskListMapper = {
  toPersistence(taskList: TaskList): TaskDocuments {
    return taskList
      .toArray()
      .map((task) => [task.id.value, TaskMapper.toPersistence(task)])
  },

  toDomain(documents: TaskDocument[], count: number): TaskList {
    const tasks = documents.map((document) => TaskMapper.toDomain(document))
    return TaskList.create({ tasks, count })
  },
}
Object.freeze(TaskListMapper)
