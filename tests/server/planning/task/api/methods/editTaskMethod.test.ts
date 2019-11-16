import * as assert from 'assert'
import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import {
  TaskCollection,
  TaskDocument,
} from '../../../../../../imports/planning/task/api/TaskCollection'
import { EditTaskDto } from '../../../../../../imports/planning/task/dto'
import { MethodNamesEnum } from '../../../../../../imports/planning/task/enums'
import { taskDocFixture, userIdFixture } from './fixtures'

describe('Edit task method', function() {
  beforeEach(function() {
    TaskCollection.remove({})
  })

  it('edit task description', function() {
    const documentId = TaskCollection.insert(taskDocFixture)
    const newText = 'Lorem ispum dolor amet sum'
    const selector: Mongo.Selector<TaskDocument> = { description: newText }
    const methodHandler =
      Meteor.server.method_handlers[MethodNamesEnum.EditTask]
    const context = Object.assign({}, { userId: userIdFixture })
    const dto: EditTaskDto = {
      taskId: documentId,
      newText,
    }

    methodHandler.apply(context, [dto])
    const actual = TaskCollection.find(selector).count()

    assert.strictEqual(actual, 1)
  })
})
