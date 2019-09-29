import { TaskDocument } from '../api/TasksCollection'
import { TaskUiModel } from './TaskUiModel'

export const TaskUiMapper = {
  toPresentation(doc: TaskDocument): TaskUiModel {
    const { _id, description, isTickedOff } = doc
    return {
      taskId: _id,
      description,
      isTickedOff,
    }
  },
}
Object.freeze(TaskUiMapper)
