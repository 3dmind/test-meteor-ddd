import { TaskDocument } from '../../api/TaskCollection'
import { ActiveTasksPresenter } from '../models'
import { TaskViewModelMapper } from './TaskViewModelMapper'

export const ActiveTasksPresenterMapper = {
  toPresentation(
    docs: TaskDocument[],
    count: number,
    tickedOffTasksCount: number,
  ): ActiveTasksPresenter {
    const tasks = docs.map((doc) => TaskViewModelMapper.toPresentation(doc))
    return ActiveTasksPresenter.create({
      tasks,
      count,
      tickedOffTasksCount,
    })
  },
}
