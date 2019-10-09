import { TaskDocument } from '../../api/TaskCollection'
import { ArchivedTasksUiModel } from '../models'
import { TaskUiMapper } from './TaskUiMapper'

export const ArchivedTasksUiModelMapper = {
  toPresentation(docs: TaskDocument[], count: number): ArchivedTasksUiModel {
    const tasks = docs.map((doc) => TaskUiMapper.toPresentation(doc))
    return ArchivedTasksUiModel.create({ tasks, count })
  },
}
Object.freeze(ArchivedTasksUiModelMapper)
