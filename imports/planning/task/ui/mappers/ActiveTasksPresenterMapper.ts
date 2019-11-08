import { TaskDocument } from '../../api/TaskCollection'
import { ActiveTasksPresenter } from '../models'
import { TaskPresenterMapper } from './TaskPresenterMapper'

export const ActiveTasksPresenterMapper = {
  toPresentation(
    docs: TaskDocument[],
    count: number,
    tickedOffTasksCount: number,
  ): ActiveTasksPresenter {
    const tasks = docs.map((doc) => TaskPresenterMapper.toPresentation(doc))
    return ActiveTasksPresenter.create({
      tasks,
      count,
      tickedOffTasksCount,
    })
  },
}
