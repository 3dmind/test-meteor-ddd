import { Mongo } from 'meteor/mongo'

export interface TaskDocument {
  _id?: string
  ownerId: string
  description: string
  createdAt?: Date
  editedAt?: Date
  isTickedOff: boolean
  tickedOffAt?: Date
  resumedAt?: Date
  isDiscarded: boolean
  discardedAt?: Date
  isArchived: boolean
  archivedAt?: Date
}

export const TaskCollection = new Mongo.Collection<TaskDocument>('tasks')

TaskCollection.deny({
  insert() {
    return true
  },
  update() {
    return true
  },
  remove() {
    return true
  },
})

export const taskPublicFields = {
  ownerId: 1,
  description: 1,
  createdAt: 1,
  editedAt: 1,
  isTickedOff: 1,
  tickedOffAt: 1,
  resumedAt: 1,
  isArchived: 1,
  archivedAt: 1,
}
