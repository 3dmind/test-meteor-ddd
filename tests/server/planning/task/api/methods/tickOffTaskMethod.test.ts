import * as assert from 'assert'
import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import {
  TaskNotFoundException,
  UnauthorizedMethodCallException,
  UnauthorizedTaskOperationException,
} from '../../../../../../imports/planning/task/api/exceptions'
import {
  TaskCollection,
  TaskDocument,
} from '../../../../../../imports/planning/task/api/TaskCollection'
import { TaskDto } from '../../../../../../imports/planning/task/dto'
import { MethodNamesEnum } from '../../../../../../imports/planning/task/enums'
import { taskDocFixture, userIdFixture } from './fixtures'

describe('Tick-off task method', function() {
  let tickOffTaskMethod
  let documentId

  before(function() {
    tickOffTaskMethod =
      Meteor.server.method_handlers[MethodNamesEnum.TickOffTask]
  })

  beforeEach(function() {
    documentId = TaskCollection.insert(taskDocFixture)
  })

  afterEach(function() {
    TaskCollection.remove({})
  })

  it('should throw when user is not logged-in', function() {
    const context = {}
    const dto: TaskDto = { taskId: documentId }

    assert.throws(() => {
      tickOffTaskMethod.apply(context, [dto])
    }, UnauthorizedMethodCallException)
  })

  it('should throw when task was not found', function() {
    const context = Object.assign({}, { userId: userIdFixture })
    const dto: TaskDto = { taskId: 'A' }

    assert.throws(() => {
      tickOffTaskMethod.apply(context, [dto])
    }, TaskNotFoundException)
  })

  it('should throw when owner and user do not match', function() {
    const context = Object.assign({}, { userId: 'YanhGvrizEdDzqQEz' })
    const dto: TaskDto = { taskId: documentId }

    assert.throws(() => {
      tickOffTaskMethod.apply(context, [dto])
    }, UnauthorizedTaskOperationException)
  })

  it('should tick-off task', function() {
    const selector: Mongo.Selector<TaskDocument> = { isTickedOff: true }
    const context = Object.assign({}, { userId: userIdFixture })
    const dto: TaskDto = { taskId: documentId }

    tickOffTaskMethod.apply(context, [dto])
    const actual = TaskCollection.find(selector).count()

    assert.strictEqual(actual, 1)
  })
})
