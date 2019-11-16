import * as assert from 'assert'
import { Meteor } from 'meteor/meteor'
import { TaskCollection } from '../../../../../../imports/planning/task/api/TaskCollection'
import { NoteTaskDto } from '../../../../../../imports/planning/task/dto'
import { MethodNamesEnum } from '../../../../../../imports/planning/task/enums'
import { userIdFixture } from './fixtures'

describe('Note task method', function() {
  beforeEach(function() {
    TaskCollection.remove({})
  })

  it('note task', function() {
    const methodHandler =
      Meteor.server.method_handlers[MethodNamesEnum.NoteTask]
    const context = Object.assign({}, { userId: userIdFixture })
    const dto: NoteTaskDto = { text: 'Lorem ipsum' }

    methodHandler.apply(context, [dto])
    const actual = TaskCollection.find().count()

    assert.strictEqual(actual, 1)
  })
})
