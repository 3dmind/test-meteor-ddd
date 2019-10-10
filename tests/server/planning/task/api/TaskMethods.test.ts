import * as assert from 'assert'
import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import {
  TaskCollection,
  TaskDocument,
} from '../../../../../imports/planning/task/api/TaskCollection'
import '../../../../../imports/planning/task/api/TaskMethods'
import {
  PLANNING_TASK_ARCHIVE_METHOD,
  PLANNING_TASK_DISCARD_ALL_ARCHIVE_METHOD,
  PLANNING_TASK_DISCARD_METHOD,
  PLANNING_TASK_EDIT_METHOD,
  PLANNING_TASK_NOTE_METHOD,
  PLANNING_TASK_RESUME_METHOD,
  PLANNING_TASK_TICK_OFF_METHOD,
} from '../../../../../imports/planning/task/constants'
import {
  DiscardArchivedTasksDto,
  EditTaskDto,
  NoteTaskDto,
  TaskDto,
} from '../../../../../imports/planning/task/dto'

if (Meteor.isServer) {
  describe('TaskMethods', function() {
    const taskDocument: TaskDocument = {
      description: 'Lorem ispum',
      createdAt: new Date(),
      isTickedOff: false,
      isDiscarded: false,
      isArchived: false,
    }

    beforeEach(function() {
      TaskCollection.remove({})
    })

    it('note task', function() {
      const methodHandler =
        Meteor.server.method_handlers[PLANNING_TASK_NOTE_METHOD]
      const dto: NoteTaskDto = { text: 'Lorem ipsum' }

      methodHandler.apply({}, [dto])
      const actual = TaskCollection.find().count()

      assert.strictEqual(actual, 1)
    })

    it('tick-off task', function() {
      const documentId = TaskCollection.insert(taskDocument)
      const selector: Mongo.Selector<TaskDocument> = { isTickedOff: true }
      const methodHandler =
        Meteor.server.method_handlers[PLANNING_TASK_TICK_OFF_METHOD]
      const dto: TaskDto = { taskId: documentId }

      methodHandler.apply({}, [dto])
      const actual = TaskCollection.find(selector).count()

      assert.strictEqual(actual, 1)
    })

    it('resume task', function() {
      const assign = Object.assign({}, taskDocument, { isTickedOff: true })
      const documentId = TaskCollection.insert(assign)
      const selector: Mongo.Selector<TaskDocument> = { isTickedOff: false }
      const methodHandler =
        Meteor.server.method_handlers[PLANNING_TASK_RESUME_METHOD]
      const dto: TaskDto = { taskId: documentId }

      methodHandler.apply({}, [dto])
      const actual = TaskCollection.find(selector).count()

      assert.strictEqual(actual, 1)
    })

    it('edit task description', function() {
      const documentId = TaskCollection.insert(taskDocument)
      const newText = 'Lorem ispum dolor amet sum'
      const selector: Mongo.Selector<TaskDocument> = { description: newText }
      const methodHandler =
        Meteor.server.method_handlers[PLANNING_TASK_EDIT_METHOD]
      const dto: EditTaskDto = {
        taskId: documentId,
        newText,
      }

      methodHandler.apply({}, [dto])
      const actual = TaskCollection.find(selector).count()

      assert.strictEqual(actual, 1)
    })

    it('archive task', function() {
      const documentId = TaskCollection.insert(taskDocument)
      const selector: Mongo.Selector<TaskDocument> = { isArchived: true }
      const methodHandler =
        Meteor.server.method_handlers[PLANNING_TASK_ARCHIVE_METHOD]
      const dto: TaskDto = { taskId: documentId }

      methodHandler.apply({}, [dto])
      const actual = TaskCollection.find(selector).count()

      assert.strictEqual(actual, 1)
    })

    it('discard all archived tasks', function() {
      const archivedTaskDocument = Object.assign({}, taskDocument, {
        isArchived: true,
      })
      const documentId = TaskCollection.insert(archivedTaskDocument)
      const selector: Mongo.Selector<TaskDocument> = { isDiscarded: true }
      const methodHandler =
        Meteor.server.method_handlers[PLANNING_TASK_DISCARD_ALL_ARCHIVE_METHOD]
      const dto: DiscardArchivedTasksDto = {
        taskIds: [documentId],
      }

      methodHandler.apply({}, [dto])
      const actual = TaskCollection.find(selector).count()

      assert.strictEqual(actual, 1)
    })

    it('discard task', function() {
      const documentId = TaskCollection.insert(taskDocument)
      const selector: Mongo.Selector<TaskDocument> = { isDiscarded: true }
      const methodHandler =
        Meteor.server.method_handlers[PLANNING_TASK_DISCARD_METHOD]
      const dto: TaskDto = { taskId: documentId }

      methodHandler.apply({}, [dto])
      const actual = TaskCollection.find(selector).count()

      assert.strictEqual(actual, 1)
    })
  })
}
