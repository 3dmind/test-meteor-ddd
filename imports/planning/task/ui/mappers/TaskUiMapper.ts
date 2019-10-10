import { TaskDocument } from '../../api/TaskCollection'
import { TaskUiModel } from '../models'

export const TaskUiMapper = {
  toPresentation(doc: TaskDocument): TaskUiModel {
    return TaskUiModel.create({
      id: doc._id,
      description: doc.description,
      isTickedOff: doc.isTickedOff,
    })
  },
}
Object.freeze(TaskUiMapper)
