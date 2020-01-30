import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import {
  TaskCollection,
  TaskCollectionPublicFields,
  TaskDocument,
} from '../../collections';
import { Publications } from '../Publications';

Meteor.publish(Publications.Tasks, function publishTasks() {
  const selector: Mongo.Selector<TaskDocument> = {
    ownerId: this.userId,
    isDiscarded: false,
  };
  const options = { fields: TaskCollectionPublicFields };
  return TaskCollection.find(selector, options);
});
