import * as assert from 'assert'
import { Meteor } from 'meteor/meteor'
import {
  NoteTaskDTO,
  NoteTaskMethodName,
} from '../../../../../../imports/planning/task/api'
import { UnauthorizedMethodCallException } from '../../../../../../imports/planning/task/api/exceptions'
import { TaskCollection } from '../../../../../../imports/planning/task/api/TaskCollection'
import { userIdFixture } from './fixtures'

describe('Note task method', function() {
  let noteTaskMethod

  before(function() {
    noteTaskMethod = Meteor.server.method_handlers[NoteTaskMethodName]
  })

  beforeEach(function() {
    TaskCollection.remove({})
  })

  it('should throw when user is not logged-in', function() {
    const context = {}
    const dto: NoteTaskDTO = { text: 'Lorem ipsum' }

    assert.throws(() => {
      noteTaskMethod.apply(context, [dto])
    }, UnauthorizedMethodCallException)
  })

  it('should note task', function() {
    const context = Object.assign({}, { userId: userIdFixture })
    const dto: NoteTaskDTO = { text: 'Lorem ipsum' }

    noteTaskMethod.apply(context, [dto])
    const actual = TaskCollection.find().count()

    assert.strictEqual(actual, 1)
  })
})
