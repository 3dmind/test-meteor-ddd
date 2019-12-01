import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { PublicationsEnum } from '../../enums'
import {
  TaskCollection,
  TaskCollectionPublicFields,
  TaskDocument,
} from '../collections'

Meteor.publish(PublicationsEnum.Tasks, function tasksPublication() {
  const selector: Mongo.Selector<TaskDocument> = {
    ownerId: this.userId,
    isDiscarded: false,
  }
  const options = { fields: TaskCollectionPublicFields }
  return TaskCollection.find(selector, options)
})
