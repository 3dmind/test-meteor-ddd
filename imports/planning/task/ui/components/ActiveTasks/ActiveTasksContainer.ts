import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { Publications } from '../../../api'
import { TaskUiService } from '../../services'
import { ActiveTasksList } from './ActiveTasksList'

export const ActiveTasksContainer = withTracker(() => {
  Meteor.subscribe(Publications.Tasks)
  return {
    activeTasks: TaskUiService.getAllActiveTasks(),
  }
})(ActiveTasksList)
ActiveTasksContainer.displayName = 'ActiveTasksContainer'
