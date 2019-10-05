import { Mongo } from 'meteor/mongo'
import { TaskDocument, TasksCollection } from '../api/TasksCollection'
import { TaskUiModel } from './TaskUiModel'
import { TaskUiMapper } from './TaskUiMapper'

export const TaskUiService = {
  getTasks(
    selector: Mongo.Selector<TaskDocument> = {},
  ): Mongo.Cursor<TaskDocument> {
    return TasksCollection.find(selector)
  },

  getAllActiveTasks(): TaskUiModel[] {
    const activeTasksSelector: Mongo.Selector<TaskDocument> = {
      isArchived: false,
    }
    return this.getTasks(activeTasksSelector).map((doc: TaskDocument) => {
      return TaskUiMapper.toPresentation(doc)
    })
  },

  getAllArchivedTasks(): TaskUiModel[] {
    const archivedTasksSelector: Mongo.Selector<TaskDocument> = {
      isArchived: true,
    }
    return this.getTasks(archivedTasksSelector).map((doc: TaskDocument) => {
      return TaskUiMapper.toPresentation(doc)
    })
  },
}

Object.freeze(TaskUiService)
