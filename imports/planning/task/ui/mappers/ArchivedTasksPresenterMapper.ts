import { TaskDocument } from '../../api/TaskCollection'
import { ArchivedTasksPresenter } from '../models'
import { TaskPresenterMapper } from './TaskPresenterMapper'

export const ArchivedTasksPresenterMapper = {
  toPresentation(docs: TaskDocument[], count: number): ArchivedTasksPresenter {
    const tasks = docs.map((doc) => TaskPresenterMapper.toPresentation(doc))
    return ArchivedTasksPresenter.create({ tasks, count })
  },
}
Object.freeze(ArchivedTasksPresenterMapper)
