import { TaskDocument } from '../../api';
import { ActiveTasksPresenter } from '../presenter';
import { TaskPresenterMapper } from './TaskPresenterMapper';

export const ActiveTasksPresenterMapper = {
  toPresentation(
    docs: TaskDocument[],
    count: number,
    tickedOffTasksCount: number,
  ): ActiveTasksPresenter {
    const tasks = docs.map((doc) => TaskPresenterMapper.toPresentation(doc));
    return ActiveTasksPresenter.create({
      tasks,
      count,
      tickedOffTasksCount,
    });
  },
};
