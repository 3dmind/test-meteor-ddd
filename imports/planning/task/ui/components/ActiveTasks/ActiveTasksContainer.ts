import { withTracker } from 'meteor/react-meteor-data'
import { TaskUiService } from '../../services'
import { ActiveTasksList } from './ActiveTasksList'

export const ActiveTasksContainer = withTracker(() => {
  return {
    activeTasks: TaskUiService.getAllActiveTasks(),
  }
})(ActiveTasksList)
ActiveTasksContainer.displayName = 'ActiveTasksContainer'
