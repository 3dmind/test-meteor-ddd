import * as assert from 'assert'
import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import {
  TaskCollection,
  TaskDocument,
} from '../../../../../../imports/planning/task/api/TaskCollection'
import { DiscardArchivedTasksDto } from '../../../../../../imports/planning/task/dto'
import { MethodNamesEnum } from '../../../../../../imports/planning/task/enums'
import { taskDocFixture, userIdFixture } from './fixtures'

describe('Discard all archived tasks method', function() {
  beforeEach(function() {
    TaskCollection.remove({})
  })

  it('discard all archived tasks', function() {
    const archivedTaskDocument = Object.assign({}, taskDocFixture, {
      isArchived: true,
    })
    const documentId = TaskCollection.insert(archivedTaskDocument)
    const selector: Mongo.Selector<TaskDocument> = { isDiscarded: true }
    const methodHandler =
      Meteor.server.method_handlers[MethodNamesEnum.DiscardAllArchivedTasks]
    const context = Object.assign({}, { userId: userIdFixture })
    const dto: DiscardArchivedTasksDto = {
      taskIds: [documentId],
    }

    methodHandler.apply(context, [dto])
    const actual = TaskCollection.find(selector).count()

    assert.strictEqual(actual, 1)
  })
})
