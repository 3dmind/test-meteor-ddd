import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { PLANNING_TASKS_PUBLICATION } from '../../../constants'
import { TaskUiModel } from '../../TaskUiModel'
import { TaskUiService } from '../../TaskUiServcie'
import { ArchivedTasksList } from './AchivedTasksList'

export const ArchivedTasksContainer = withTracker(() => {
  let taskList: TaskUiModel[] = []
  const handle = Meteor.subscribe(PLANNING_TASKS_PUBLICATION)
  if (handle.ready()) {
    taskList = TaskUiService.getAllArchivedTasks()
  }
  return {
    taskList,
  }
})(ArchivedTasksList)
ArchivedTasksContainer.displayName = 'ArchivedTasksContainer'
