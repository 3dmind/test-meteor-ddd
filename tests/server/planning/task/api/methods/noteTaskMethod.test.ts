import * as assert from 'assert'
import { Meteor } from 'meteor/meteor'
import { UnauthorizedMethodCallException } from '../../../../../../imports/planning/task/api/exceptions'
import { TaskCollection } from '../../../../../../imports/planning/task/api/TaskCollection'
import { NoteTaskDto } from '../../../../../../imports/planning/task/dto'
import { MethodNamesEnum } from '../../../../../../imports/planning/task/enums'
import { userIdFixture } from './fixtures'

describe('Note task method', function() {
  let noteTaskMethod

  before(function() {
    noteTaskMethod = Meteor.server.method_handlers[MethodNamesEnum.NoteTask]
  })

  beforeEach(function() {
    TaskCollection.remove({})
  })

  it('should throw when user is not logged-in', function() {
    const context = {}
    const dto: NoteTaskDto = { text: 'Lorem ipsum' }

    assert.throws(() => {
      noteTaskMethod.apply(context, [dto])
    }, UnauthorizedMethodCallException)
  })

  it('should note task', function() {
    const context = Object.assign({}, { userId: userIdFixture })
    const dto: NoteTaskDto = { text: 'Lorem ipsum' }

    noteTaskMethod.apply(context, [dto])
    const actual = TaskCollection.find().count()

    assert.strictEqual(actual, 1)
  })
})
