import { TaskDocument } from '../../api/TaskCollection'
import { ArchivedTasksPresenter } from '../models'
import { TaskViewModelMapper } from './TaskViewModelMapper'

export const ArchivedTasksPresenterMapper = {
  toPresentation(docs: TaskDocument[], count: number): ArchivedTasksPresenter {
    const tasks = docs.map((doc) => TaskViewModelMapper.toPresentation(doc))
    return ArchivedTasksPresenter.create({ tasks, count })
  },
}
Object.freeze(ArchivedTasksPresenterMapper)
