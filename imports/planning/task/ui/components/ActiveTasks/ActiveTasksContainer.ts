import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { PublicationsEnum } from '../../../enums'
import { TaskUiService } from '../../services'
import { ActiveTasksList } from './ActiveTasksList'

export const ActiveTasksContainer = withTracker(() => {
  Meteor.subscribe(PublicationsEnum.Tasks)
  return {
    activeTasks: TaskUiService.getAllActiveTasks(),
  }
})(ActiveTasksList)
ActiveTasksContainer.displayName = 'ActiveTasksContainer'
