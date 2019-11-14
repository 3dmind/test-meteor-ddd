import { Meteor } from 'meteor/meteor'
import { PLANNING_TASKS_PUBLICATION } from '../../constants'
import { TaskCollection, taskPublicFields } from '../TaskCollection'

Meteor.publish(PLANNING_TASKS_PUBLICATION, function tasksPublication() {
  const selector = { isDiscarded: false }
  const options = { fields: taskPublicFields }
  return TaskCollection.find(selector, options)
})
