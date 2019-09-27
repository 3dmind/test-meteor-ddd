import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { PLANNING_TASKS_PUBLICATION } from '../../constants'
import { TasksRepository } from '../../TasksRepository'
import { ActiveTasksList } from './ActiveTasksList'

export const ActiveTasksListContainer = withTracker(() => {
  let taskList = []
  const handle = Meteor.subscribe(PLANNING_TASKS_PUBLICATION)
  if (handle.ready()) {
    taskList = TasksRepository.getAllActive()
  }
  return {
    taskList: taskList,
  }
})(ActiveTasksList)
ActiveTasksListContainer.displayName = 'ActiveTasksListContainer'
