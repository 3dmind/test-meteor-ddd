import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { PLANNING_TASKS_PUBLICATION } from '../../constants'
import { TasksRepository } from '../../TasksRepository'
import { ArchivedTasksList } from './AchivedTasksList'

export const ArchivedTasksListContainer = withTracker(() => {
  let taskList = []
  const handle = Meteor.subscribe(PLANNING_TASKS_PUBLICATION)
  if (handle.ready()) {
    taskList = TasksRepository.getAllArchived()
  }
  return {
    taskList,
  }
})(ArchivedTasksList)
ArchivedTasksListContainer.displayName = 'ArchivedTasksListContainer'
