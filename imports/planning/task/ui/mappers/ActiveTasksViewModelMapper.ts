import { TaskDocument } from '../../api/TaskCollection'
import { ActiveTasksPresenter } from '../models'
import { TaskViewModelMapper } from './TaskViewModelMapper'

export const ActiveTasksViewModelMapper = {
  toPresentation(
    docs: TaskDocument[],
    count: number,
    tickOffTasksCount: number,
  ): ActiveTasksPresenter {
    const tasks = docs.map((doc) => TaskViewModelMapper.toPresentation(doc))
    return ActiveTasksPresenter.create({
      tasks,
      count,
      tickOffTasksCount,
    })
  },
}
