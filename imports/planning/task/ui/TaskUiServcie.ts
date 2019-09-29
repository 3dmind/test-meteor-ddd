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
    const selector: Mongo.Selector<TaskDocument> = {
      isDiscarded: false,
      isArchived: false,
    }
    return this.getTasks(selector).map((doc: TaskDocument) => {
      return TaskUiMapper.toPresentation(doc)
    })
  },

  getAllArchivedTasks(): TaskUiModel[] {
    const selector: Mongo.Selector<TaskDocument> = {
      isDiscarded: false,
      isArchived: true,
    }
    return this.getTasks(selector).map((doc: TaskDocument) => {
      return TaskUiMapper.toPresentation(doc)
    })
  },
}

Object.freeze(TaskUiService)
