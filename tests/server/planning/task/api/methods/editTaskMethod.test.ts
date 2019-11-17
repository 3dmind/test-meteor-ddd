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
import { EditTaskDto } from '../../../../../../imports/planning/task/dto'
import { MethodNamesEnum } from '../../../../../../imports/planning/task/enums'
import { taskDocFixture, userIdFixture } from './fixtures'

describe('Edit task method', function() {
  let editTaskMethod
  let documentId

  before(function() {
    editTaskMethod = Meteor.server.method_handlers[MethodNamesEnum.EditTask]
  })

  beforeEach(function() {
    documentId = TaskCollection.insert(taskDocFixture)
  })

  afterEach(function() {
    TaskCollection.remove({})
  })

  it('should throw when user is not logged-in', function() {
    const newText = 'Lorem ispum dolor amet sum'
    const context = {}
    const dto: EditTaskDto = {
      taskId: documentId,
      newText,
    }

    assert.throws(() => {
      editTaskMethod.apply(context, [dto])
    }, UnauthorizedMethodCallException)
  })

  it('should throw when task was not found', function() {
    const newText = 'Lorem ispum dolor amet sum'
    const context = Object.assign({}, { userId: userIdFixture })
    const dto: EditTaskDto = {
      taskId: 'A',
      newText,
    }

    assert.throws(() => {
      editTaskMethod.apply(context, [dto])
    }, TaskNotFoundException)
  })

  it('should throw when owner and user do not match', function() {
    const newText = 'Lorem ispum dolor amet sum'
    const context = Object.assign({}, { userId: 'YanhGvrizEdDzqQEz' })
    const dto: EditTaskDto = {
      taskId: documentId,
      newText,
    }

    assert.throws(() => {
      editTaskMethod.apply(context, [dto])
    }, UnauthorizedTaskOperationException)
  })

  it('should edit task description', function() {
    const newText = 'Lorem ispum dolor amet sum'
    const selector: Mongo.Selector<TaskDocument> = { description: newText }
    const context = Object.assign({}, { userId: userIdFixture })
    const dto: EditTaskDto = {
      taskId: documentId,
      newText,
    }

    editTaskMethod.apply(context, [dto])
    const actual = TaskCollection.find(selector).count()

    assert.strictEqual(actual, 1)
  })
})
