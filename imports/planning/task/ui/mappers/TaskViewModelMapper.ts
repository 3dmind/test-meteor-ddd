import { TaskDocument } from '../../api/TaskCollection'
import { TaskViewModel } from '../models'

export const TaskViewModelMapper = {
  toPresentation(doc: TaskDocument): TaskViewModel {
    return TaskViewModel.create({
      id: doc._id,
      description: doc.description,
      createdAt: doc.createdAt,
      isTickedOff: doc.isTickedOff,
      tickedOffAt: doc.tickedOffAt,
      isArchived: doc.isArchived,
      archivedAt: doc.archivedAt,
    })
  },
}
Object.freeze(TaskViewModelMapper)
