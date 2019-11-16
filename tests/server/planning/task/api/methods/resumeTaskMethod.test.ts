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

describe('Resume task method', function() {
  beforeEach(function() {
    TaskCollection.remove({})
  })

  it('resume task', function() {
    const assign = Object.assign({}, taskDocFixture, { isTickedOff: true })
    const documentId = TaskCollection.insert(assign)
    const selector: Mongo.Selector<TaskDocument> = { isTickedOff: false }
    const methodHandler =
      Meteor.server.method_handlers[MethodNamesEnum.ResumeTask]
    const context = Object.assign({}, { userId: userIdFixture })
    const dto: TaskDto = { taskId: documentId }

    methodHandler.apply(context, [dto])
    const actual = TaskCollection.find(selector).count()

    assert.strictEqual(actual, 1)
  })
})
