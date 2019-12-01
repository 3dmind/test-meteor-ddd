import * as assert from 'assert'
import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import {
  ResumeTaskDTO,
  ResumeTaskMethodName,
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

describe('Resume task method', function() {
  let resumeTaskMethod
  let documentId

  before(function() {
    resumeTaskMethod = Meteor.server.method_handlers[ResumeTaskMethodName]
  })

  beforeEach(function() {
    const document = Object.assign({}, taskDocFixture, { isTickedOff: true })
    documentId = TaskCollection.insert(document)
  })

  afterEach(function() {
    TaskCollection.remove({})
  })

  it('should throw when user is not logged-in', function() {
    const context = {}
    const dto: ResumeTaskDTO = { taskId: documentId }

    assert.throws(() => {
      resumeTaskMethod.apply(context, [dto])
    }, UnauthorizedMethodCallException)
  })

  it('should throw when task was not found', function() {
    const context = Object.assign({}, { userId: userIdFixture })
    const dto: ResumeTaskDTO = { taskId: 'A' }

    assert.throws(() => {
      resumeTaskMethod.apply(context, [dto])
    }, TaskNotFoundException)
  })

  it('should throw when owner and user do not match', function() {
    const context = Object.assign({}, { userId: 'YanhGvrizEdDzqQEz' })
    const dto: ResumeTaskDTO = { taskId: documentId }

    assert.throws(() => {
      resumeTaskMethod.apply(context, [dto])
    }, UnauthorizedTaskOperationException)
  })

  it('should resume task', function() {
    const selector: Mongo.Selector<TaskDocument> = { isTickedOff: false }
    const context = Object.assign({}, { userId: userIdFixture })
    const dto: ResumeTaskDTO = { taskId: documentId }

    resumeTaskMethod.apply(context, [dto])
    const actual = TaskCollection.find(selector).count()

    assert.strictEqual(actual, 1)
  })
})