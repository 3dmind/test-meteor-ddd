import { TaskDocument } from '../../api/TaskCollection'
import { ActiveTasksUiModel } from '../models'
import { TaskUiMapper } from './TaskUiMapper'

export const ActiveTasksUiModelMapper = {
  toPresentation(
    docs: TaskDocument[],
    count: number,
    tickOffTasksCount: number,
  ): ActiveTasksUiModel {
    const tasks = docs.map((doc) => TaskUiMapper.toPresentation(doc))
    return ActiveTasksUiModel.create({
      tasks,
      count,
      tickOffTasksCount,
    })
  },
}
