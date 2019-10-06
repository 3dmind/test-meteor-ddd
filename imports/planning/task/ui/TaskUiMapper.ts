import { TaskDocument } from '../api/TaskCollection'
import { TaskUiModel } from './TaskUiModel'

export const TaskUiMapper = {
  toPresentation(doc: TaskDocument): TaskUiModel {
    const { _id, description, isTickedOff } = doc
    return {
      id: _id,
      description,
      isTickedOff,
    }
  },
}
Object.freeze(TaskUiMapper)
