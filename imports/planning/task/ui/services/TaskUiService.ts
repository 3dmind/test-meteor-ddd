import { Mongo } from 'meteor/mongo'
import { TaskCollection, TaskDocument } from '../../api/TaskCollection'
import {
  ActiveTasksPresenterMapper,
  ArchivedTasksPresenterMapper,
} from '../mappers'
import { ActiveTasksPresenter, ArchivedTasksPresenter } from '../presenter'

function findTasks(
  selector: Mongo.Selector<TaskDocument> = {},
): Mongo.Cursor<TaskDocument> {
  return TaskCollection.find(selector)
}

export const TaskUiService = {
  getAllActiveTasks(): ActiveTasksPresenter {
    const cursor = findTasks({ isArchived: false })
    const count = cursor.count()
    const taskDocuments = cursor.fetch()
    const tickedOffTasksCount = findTasks({
      isArchived: false,
      isTickedOff: true,
    }).count()
    return ActiveTasksPresenterMapper.toPresentation(
      taskDocuments,
      count,
      tickedOffTasksCount,
    )
  },

  getAllArchivedTasks(): ArchivedTasksPresenter {
    const cursor = findTasks({ isArchived: true })
    const count = cursor.count()
    const taskDocuments = cursor.fetch()
    return ArchivedTasksPresenterMapper.toPresentation(taskDocuments, count)
  },
}
Object.freeze(TaskUiService)
