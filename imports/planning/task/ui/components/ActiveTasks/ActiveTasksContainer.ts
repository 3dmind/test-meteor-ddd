import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { PLANNING_TASKS_PUBLICATION } from '../../../constants'
import { TaskUiService } from '../../services'
import { ActiveTasksList } from './ActiveTasksList'

export const ActiveTasksContainer = withTracker(() => {
  Meteor.subscribe(PLANNING_TASKS_PUBLICATION)
  return {
    activeTasks: TaskUiService.getAllActiveTasks(),
  }
})(ActiveTasksList)
ActiveTasksContainer.displayName = 'ActiveTasksContainer'
