import { Mongo } from 'meteor/mongo'
import { TaskCollection, TaskDocument } from '../../api/TaskCollection'
import {
  ActiveTasksViewModelMapper,
  ArchivedTasksViewModelMapper,
} from '../mappers'
import { ActiveTasksViewModel, ArchivedTasksViewModel } from '../models'

function findTasks(
  selector: Mongo.Selector<TaskDocument> = {},
): Mongo.Cursor<TaskDocument> {
  return TaskCollection.find(selector)
}

export const TaskUiService = {
  getAllActiveTasks(): ActiveTasksViewModel {
    const cursor = findTasks({ isArchived: false })
    const count = cursor.count()
    const taskDocuments = cursor.fetch()
    const tickedOffTasksCount = findTasks({
      isArchived: false,
      isTickedOff: true,
    }).count()
    return ActiveTasksViewModelMapper.toPresentation(
      taskDocuments,
      count,
      tickedOffTasksCount,
    )
  },

  getAllArchivedTasks(): ArchivedTasksViewModel {
    const cursor = findTasks({ isArchived: true })
    const count = cursor.count()
    const taskDocuments = cursor.fetch()
    return ArchivedTasksViewModelMapper.toPresentation(taskDocuments, count)
  },
}
Object.freeze(TaskUiService)
