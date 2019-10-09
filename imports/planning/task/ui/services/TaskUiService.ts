import { Mongo } from 'meteor/mongo'
import { TaskCollection, TaskDocument } from '../../api/TaskCollection'
import {
  ActiveTasksUiModelMapper,
  ArchivedTasksUiModelMapper,
} from '../mappers'
import { ActiveTasksUiModel, ArchivedTasksUiModel } from '../models'

function findTasks(
  selector: Mongo.Selector<TaskDocument> = {},
): Mongo.Cursor<TaskDocument> {
  return TaskCollection.find(selector)
}

export const TaskUiService = {
  getAllActiveTasks(): ActiveTasksUiModel {
    const cursor = findTasks({ isArchived: false })
    const count = cursor.count()
    const taskDocuments = cursor.fetch()
    const tickedOffTasksCount = findTasks({
      isArchived: false,
      isTickedOff: true,
    }).count()
    return ActiveTasksUiModelMapper.toPresentation(
      taskDocuments,
      count,
      tickedOffTasksCount,
    )
  },

  getAllArchivedTasks(): ArchivedTasksUiModel {
    const cursor = findTasks({ isArchived: true })
    const count = cursor.count()
    const taskDocuments = cursor.fetch()
    return ArchivedTasksUiModelMapper.toPresentation(taskDocuments, count)
  },
}
Object.freeze(TaskUiService)
