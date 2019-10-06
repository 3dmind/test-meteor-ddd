import { Mongo } from 'meteor/mongo'
import { TaskDocument, TaskCollection } from '../api/TaskCollection'
import { TaskUiModel } from './TaskUiModel'
import { TaskUiMapper } from './TaskUiMapper'

function findTasks(
  selector: Mongo.Selector<TaskDocument> = {},
): Mongo.Cursor<TaskDocument> {
  return TaskCollection.find(selector)
}

export const TaskUiService = {
  getAllActiveTasks(): TaskUiModel[] {
    const activeTasksSelector: Mongo.Selector<TaskDocument> = {
      isArchived: false,
    }
    return findTasks(activeTasksSelector).map((doc: TaskDocument) => {
      return TaskUiMapper.toPresentation(doc)
    })
  },

  getAllArchivedTasks(): TaskUiModel[] {
    const archivedTasksSelector: Mongo.Selector<TaskDocument> = {
      isArchived: true,
    }
    return findTasks(archivedTasksSelector).map((doc: TaskDocument) => {
      return TaskUiMapper.toPresentation(doc)
    })
  },
}

Object.freeze(TaskUiService)
