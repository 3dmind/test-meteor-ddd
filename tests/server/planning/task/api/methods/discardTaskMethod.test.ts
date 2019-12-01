import * as assert from 'assert'
import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import {
  DiscardTaskDTO,
  DiscardTaskMethodName,
} from '../../../../../../imports/planning/task/api'
import {
  TaskNotFoundException,
  UnauthorizedMethodCallException,
  UnauthorizedTaskOperationException,
} from '../../../../../../imports/planning/task/api/exceptions'
import {
  TaskCollection,
  TaskDocument,
} from '../../../../../../imports/planning/task/api/TaskCollection'
import { taskDocFixture, userIdFixture } from './fixtures'

describe('Discard task method', function() {
  let discardTaskMethod
  let documentId

  before(function() {
    discardTaskMethod = Meteor.server.method_handlers[DiscardTaskMethodName]
  })

  beforeEach(function() {
    documentId = TaskCollection.insert(taskDocFixture)
  })

  afterEach(function() {
    TaskCollection.remove({})
  })

  it('should throw when user is not logged-in', function() {
    const context = {}
    const dto: DiscardTaskDTO = { taskId: documentId }

    assert.throws(() => {
      discardTaskMethod.apply(context, [dto])
    }, UnauthorizedMethodCallException)
  })

  it('should throw when task was not found', function() {
    const context = Object.assign({}, { userId: userIdFixture })
    const dto: DiscardTaskDTO = { taskId: 'A' }

    assert.throws(() => {
      discardTaskMethod.apply(context, [dto])
    }, TaskNotFoundException)
  })

  it('should throw when owner and user do not match', function() {
    const context = Object.assign({}, { userId: 'YanhGvrizEdDzqQEz' })
    const dto: DiscardTaskDTO = { taskId: documentId }

    assert.throws(() => {
      discardTaskMethod.apply(context, [dto])
    }, UnauthorizedTaskOperationException)
  })

  it('should discard task', function() {
    const selector: Mongo.Selector<TaskDocument> = { isDiscarded: true }
    const context = Object.assign({}, { userId: userIdFixture })
    const dto: DiscardTaskDTO = { taskId: documentId }

    discardTaskMethod.apply(context, [dto])
    const actual = TaskCollection.find(selector).count()

    assert.strictEqual(actual, 1)
  })
})
