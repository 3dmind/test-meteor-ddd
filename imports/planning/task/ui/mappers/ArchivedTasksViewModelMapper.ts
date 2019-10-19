import { TaskDocument } from '../../api/TaskCollection'
import { ArchivedTasksViewModel } from '../models'
import { TaskViewModelMapper } from './TaskViewModelMapper'

export const ArchivedTasksViewModelMapper = {
  toPresentation(docs: TaskDocument[], count: number): ArchivedTasksViewModel {
    const tasks = docs.map((doc) => TaskViewModelMapper.toPresentation(doc))
    return ArchivedTasksViewModel.create({ tasks, count })
  },
}
Object.freeze(ArchivedTasksViewModelMapper)
