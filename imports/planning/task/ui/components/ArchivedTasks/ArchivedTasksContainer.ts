import { withTracker } from 'meteor/react-meteor-data'
import { TaskUiService } from '../../services'
import { ArchivedTasksList } from './ArchivedTasksList'

export const ArchivedTasksContainer = withTracker(() => {
  return {
    archivedTasks: TaskUiService.getAllArchivedTasks(),
  }
})(ArchivedTasksList)
ArchivedTasksContainer.displayName = 'ArchivedTasksContainer'
