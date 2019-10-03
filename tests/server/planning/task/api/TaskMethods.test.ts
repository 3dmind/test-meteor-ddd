import * as assert from 'assert'
import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import '../../../../../imports/planning/task/api/TaskMethods'
import {
  TaskDocument,
  TasksCollection,
} from '../../../../../imports/planning/task/api/TasksCollection'
import {
  PLANNING_TASK_ARCHIVE_METHOD,
  PLANNING_TASK_DISCARD_METHOD,
  PLANNING_TASK_EDIT_METHOD,
  PLANNING_TASK_NOTE_METHOD,
  PLANNING_TASK_RESUME_METHOD,
  PLANNING_TASK_TICK_OFF_METHOD,
} from '../../../../../imports/planning/task/constants'
import {
  ArchiveTaskDto,
  DiscardTaskDto,
  EditTaskDto,
  NoteTaskDto,
  ResumeTaskDto,
  TickOffTaskDto,
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
      TasksCollection.remove({})
    })

    it('note task', function() {
      const noteTaskMethodHandler =
        Meteor.server.method_handlers[PLANNING_TASK_NOTE_METHOD]
      const noteTaskDto = new NoteTaskDto('Lorem ipsum')

      noteTaskMethodHandler.apply({}, [noteTaskDto])
      const actual = TasksCollection.find().count()

      assert.strictEqual(actual, 1)
    })

    it('tick-off task', function() {
      const taskDocumentId = TasksCollection.insert(taskDocument)
      const selector: Mongo.Selector<TaskDocument> = { isTickedOff: true }
      const tickOffTaskMethodHandler =
        Meteor.server.method_handlers[PLANNING_TASK_TICK_OFF_METHOD]
      const tickOffTaskDto = new TickOffTaskDto(taskDocumentId)

      tickOffTaskMethodHandler.apply({}, [tickOffTaskDto])
      const actual = TasksCollection.find(selector).count()

      assert.strictEqual(actual, 1)
    })

    it('resume task', function() {
      const assign = Object.assign({}, taskDocument, { isTickedOff: true })
      const taskDocumentId = TasksCollection.insert(assign)
      const selector: Mongo.Selector<TaskDocument> = { isTickedOff: false }
      const resumeTaskMethodHandler =
        Meteor.server.method_handlers[PLANNING_TASK_RESUME_METHOD]
      const resumeTaskDto = new ResumeTaskDto(taskDocumentId)

      resumeTaskMethodHandler.apply({}, [resumeTaskDto])
      const actual = TasksCollection.find(selector).count()

      assert.strictEqual(actual, 1)
    })

    it('edit task description', function() {
      const taskDocumentId = TasksCollection.insert(taskDocument)
      const newText = 'Lorem ispum dolor amet sum'
      const selector: Mongo.Selector<TaskDocument> = { description: newText }
      const editTaskMethodHandler =
        Meteor.server.method_handlers[PLANNING_TASK_EDIT_METHOD]
      const editTaskDto = new EditTaskDto(taskDocumentId, newText)

      editTaskMethodHandler.apply({}, [editTaskDto])
      const actual = TasksCollection.find(selector).count()

      assert.strictEqual(actual, 1)
    })

    it('archive task', function() {
      const taskDocumentId = TasksCollection.insert(taskDocument)
      const selector: Mongo.Selector<TaskDocument> = { isArchived: true }
      const archiveTaskMethodHandler =
        Meteor.server.method_handlers[PLANNING_TASK_ARCHIVE_METHOD]
      const archiveTaskDto = new ArchiveTaskDto(taskDocumentId)

      archiveTaskMethodHandler.apply({}, [archiveTaskDto])
      const actual = TasksCollection.find(selector).count()

      assert.strictEqual(actual, 1)
    })

    it('discard task', function() {
      const taskDocumentId = TasksCollection.insert(taskDocument)
      const selector: Mongo.Selector<TaskDocument> = { isDiscarded: true }
      const discardTaskMethodHandler =
        Meteor.server.method_handlers[PLANNING_TASK_DISCARD_METHOD]
      const discardTaskDto = new DiscardTaskDto(taskDocumentId)

      discardTaskMethodHandler.apply({}, [discardTaskDto])
      const actual = TasksCollection.find(selector).count()

      assert.strictEqual(actual, 1)
    })
  })
}
