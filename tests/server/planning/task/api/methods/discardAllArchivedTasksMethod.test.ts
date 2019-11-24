import * as assert from 'assert'
import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import {
  TaskNotFoundException,
  UnauthorizedMethodCallException,
} from '../../../../../../imports/planning/task/api/exceptions'
import {
  TaskCollection,
  TaskDocument,
} from '../../../../../../imports/planning/task/api/TaskCollection'
import { DiscardArchivedTasksDto } from '../../../../../../imports/planning/task/dto'
import { MethodNamesEnum } from '../../../../../../imports/planning/task/enums'
import { taskDocFixture, userIdFixture } from './fixtures'

describe('Discard all archived tasks method', function() {
  let discardAllArchivedTasksMethod
  let documentId

  before(function() {
    discardAllArchivedTasksMethod =
      Meteor.server.method_handlers[MethodNamesEnum.DiscardAllArchivedTasks]
  })

  beforeEach(function() {
    const archivedTaskDocument = Object.assign({}, taskDocFixture, {
      isArchived: true,
    })
    documentId = TaskCollection.insert(archivedTaskDocument)
  })

  afterEach(function() {
    TaskCollection.remove({})
  })

  it('should throw when user is not logged-in', function() {
    const context = {}
    const dto: DiscardArchivedTasksDto = {
      taskIds: [documentId],
    }

    assert.throws(() => {
      discardAllArchivedTasksMethod.apply(context, [dto])
    }, UnauthorizedMethodCallException)
  })

  it('should throw when no tasks were found', function() {
    const context = Object.assign({}, { userId: userIdFixture })
    const dto: DiscardArchivedTasksDto = {
      taskIds: ['A'],
    }

    assert.throws(() => {
      discardAllArchivedTasksMethod.apply(context, [dto])
    }, TaskNotFoundException)
  })

  it('should discard all archived tasks', function() {
    const selector: Mongo.Selector<TaskDocument> = { isDiscarded: true }
    const context = Object.assign({}, { userId: userIdFixture })
    const dto: DiscardArchivedTasksDto = {
      taskIds: [documentId],
    }

    discardAllArchivedTasksMethod.apply(context, [dto])
    const actual = TaskCollection.find(selector).count()

    assert.strictEqual(actual, 1)
  })
})
