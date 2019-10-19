import { TaskDocument } from '../../api/TaskCollection'
import { ActiveTasksViewModel } from '../models'
import { TaskViewModelMapper } from './TaskViewModelMapper'

export const ActiveTasksViewModelMapper = {
  toPresentation(
    docs: TaskDocument[],
    count: number,
    tickOffTasksCount: number,
  ): ActiveTasksViewModel {
    const tasks = docs.map((doc) => TaskViewModelMapper.toPresentation(doc))
    return ActiveTasksViewModel.create({
      tasks,
      count,
      tickOffTasksCount,
    })
  },
}
