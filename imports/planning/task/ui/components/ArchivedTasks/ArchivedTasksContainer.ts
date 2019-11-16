import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { PublicationsEnum } from '../../../enums'
import { TaskUiService } from '../../services'
import { ArchivedTasksList } from './ArchivedTasksList'

export const ArchivedTasksContainer = withTracker(() => {
  Meteor.subscribe(PublicationsEnum.Tasks)
  return {
    archivedTasks: TaskUiService.getAllArchivedTasks(),
  }
})(ArchivedTasksList)
ArchivedTasksContainer.displayName = 'ArchivedTasksContainer'
