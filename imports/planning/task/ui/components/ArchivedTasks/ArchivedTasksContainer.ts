import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { PLANNING_TASKS_PUBLICATION } from '../../../constants'
import { TaskUiService } from '../../services'
import { ArchivedTasksList } from './ArchivedTasksList'

export const ArchivedTasksContainer = withTracker(() => {
  Meteor.subscribe(PLANNING_TASKS_PUBLICATION)
  return {
    archivedTasks: TaskUiService.getAllArchivedTasks(),
  }
})(ArchivedTasksList)
ArchivedTasksContainer.displayName = 'ArchivedTasksContainer'
