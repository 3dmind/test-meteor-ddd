import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { PLANNING_TASKS_PUBLICATION } from '../../../constants'
import { TaskUiModel } from '../../TaskUiModel'
import { TaskUiService } from '../../TaskUiServcie'
import { ActiveTasksList } from './ActiveTasksList'

export const ActiveTasksContainer = withTracker(() => {
  let taskList: TaskUiModel[] = []
  const handle = Meteor.subscribe(PLANNING_TASKS_PUBLICATION)
  if (handle.ready()) {
    taskList = TaskUiService.getAllActiveTasks()
  }
  return {
    taskList: taskList,
  }
})(ActiveTasksList)
ActiveTasksContainer.displayName = 'ActiveTasksContainer'
