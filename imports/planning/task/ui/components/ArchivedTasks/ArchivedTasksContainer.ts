import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { Publications } from '../../../api'
import { TaskUiService } from '../../services'
import { ArchivedTasksList } from './ArchivedTasksList'

export const ArchivedTasksContainer = withTracker(() => {
  Meteor.subscribe(Publications.Tasks)
  return {
    archivedTasks: TaskUiService.getAllArchivedTasks(),
  }
})(ArchivedTasksList)
ArchivedTasksContainer.displayName = 'ArchivedTasksContainer'
