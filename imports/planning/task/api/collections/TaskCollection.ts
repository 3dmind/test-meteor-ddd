import { Mongo } from 'meteor/mongo';
import { TaskDocument } from './TaskDocument';

export const TaskCollection = new Mongo.Collection<TaskDocument>('tasks');

TaskCollection.deny({
  insert() {
    return true;
  },
  update() {
    return true;
  },
  remove() {
    return true;
  },
});
