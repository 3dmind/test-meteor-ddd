import { TaskDocument } from '../../api';
import { TaskPresenter } from '../presenter';

export const TaskPresenterMapper = {
  toPresentation(doc: TaskDocument): TaskPresenter {
    return TaskPresenter.create({
      id: doc._id,
      description: doc.description,
      createdAt: doc.createdAt,
      isTickedOff: doc.isTickedOff,
      tickedOffAt: doc.tickedOffAt,
      isArchived: doc.isArchived,
      archivedAt: doc.archivedAt,
    });
  },
};
Object.freeze(TaskPresenterMapper);
