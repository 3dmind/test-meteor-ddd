import { Meteor } from 'meteor/meteor'
import { PublicationsEnum } from '../../enums'
import { TaskCollection, taskPublicFields } from '../TaskCollection'

Meteor.publish(PublicationsEnum.Tasks, function tasksPublication() {
  const selector = { isDiscarded: false }
  const options = { fields: taskPublicFields }
  return TaskCollection.find(selector, options)
})
