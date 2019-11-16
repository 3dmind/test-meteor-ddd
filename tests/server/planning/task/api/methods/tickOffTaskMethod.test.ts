import * as assert from 'assert'
import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import {
  TaskCollection,
  TaskDocument,
} from '../../../../../../imports/planning/task/api/TaskCollection'
import { TaskDto } from '../../../../../../imports/planning/task/dto'
import { MethodNamesEnum } from '../../../../../../imports/planning/task/enums'
import { taskDocFixture, userIdFixture } from './fixtures'

describe('Tick-off task method', function() {
  beforeEach(function() {
    TaskCollection.remove({})
  })

  it('tick-off task', function() {
    const documentId = TaskCollection.insert(taskDocFixture)
    const selector: Mongo.Selector<TaskDocument> = { isTickedOff: true }
    const methodHandler =
      Meteor.server.method_handlers[MethodNamesEnum.TickOffTask]
    const context = Object.assign({}, { userId: userIdFixture })
    const dto: TaskDto = { taskId: documentId }

    methodHandler.apply(context, [dto])
    const actual = TaskCollection.find(selector).count()

    assert.strictEqual(actual, 1)
  })
})
