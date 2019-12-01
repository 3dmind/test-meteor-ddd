import * as assert from 'assert'
import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import {
  TaskCollection,
  TaskDocument,
  TickOffTaskDTO,
  TickOffTaskMethodName,
} from '../../../../../../imports/planning/task/api'
import {
  TaskNotFoundException,
  UnauthorizedMethodCallException,
  UnauthorizedTaskOperationException,
} from '../../../../../../imports/planning/task/api/exceptions'
import { taskDocFixture, userIdFixture } from './fixtures'

describe('Tick-off task method', function() {
  let tickOffTaskMethod
  let documentId

  before(function() {
    tickOffTaskMethod = Meteor.server.method_handlers[TickOffTaskMethodName]
  })

  beforeEach(function() {
    documentId = TaskCollection.insert(taskDocFixture)
  })

  afterEach(function() {
    TaskCollection.remove({})
  })

  it('should throw when user is not logged-in', function() {
    const context = {}
    const dto: TickOffTaskDTO = { taskId: documentId }

    assert.throws(() => {
      tickOffTaskMethod.apply(context, [dto])
    }, UnauthorizedMethodCallException)
  })

  it('should throw when task was not found', function() {
    const context = Object.assign({}, { userId: userIdFixture })
    const dto: TickOffTaskDTO = { taskId: 'A' }

    assert.throws(() => {
      tickOffTaskMethod.apply(context, [dto])
    }, TaskNotFoundException)
  })

  it('should throw when owner and user do not match', function() {
    const context = Object.assign({}, { userId: 'YanhGvrizEdDzqQEz' })
    const dto: TickOffTaskDTO = { taskId: documentId }

    assert.throws(() => {
      tickOffTaskMethod.apply(context, [dto])
    }, UnauthorizedTaskOperationException)
  })

  it('should tick-off task', function() {
    const selector: Mongo.Selector<TaskDocument> = { isTickedOff: true }
    const context = Object.assign({}, { userId: userIdFixture })
    const dto: TickOffTaskDTO = { taskId: documentId }

    tickOffTaskMethod.apply(context, [dto])
    const actual = TaskCollection.find(selector).count()

    assert.strictEqual(actual, 1)
  })
})
