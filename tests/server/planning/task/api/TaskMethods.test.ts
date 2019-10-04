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
  PLANNING_TASK_DISCARD_ALL_ARCHIVE_METHOD,
  PLANNING_TASK_DISCARD_METHOD,
  PLANNING_TASK_EDIT_METHOD,
  PLANNING_TASK_NOTE_METHOD,
  PLANNING_TASK_RESUME_METHOD,
  PLANNING_TASK_TICK_OFF_METHOD,
} from '../../../../../imports/planning/task/constants'
import {
  ArchiveTaskDto,
  DiscardArchivedTasksDto,
  DiscardTaskDto,
  EditTaskDto,
  NoteTaskDto,
  ResumeTaskDto,
  TickOffTaskDto,
} from '../../../../../imports/planning/task/dto'
import { TaskUiModel } from '../../../../../imports/planning/task/ui/TaskUiModel'

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
      const methodHandler =
        Meteor.server.method_handlers[PLANNING_TASK_NOTE_METHOD]
      const noteTaskDto = new NoteTaskDto('Lorem ipsum')

      methodHandler.apply({}, [noteTaskDto])
      const actual = TasksCollection.find().count()

      assert.strictEqual(actual, 1)
    })

    it('tick-off task', function() {
      const documentId = TasksCollection.insert(taskDocument)
      const selector: Mongo.Selector<TaskDocument> = { isTickedOff: true }
      const methodHandler =
        Meteor.server.method_handlers[PLANNING_TASK_TICK_OFF_METHOD]
      const tickOffTaskDto = new TickOffTaskDto(documentId)

      methodHandler.apply({}, [tickOffTaskDto])
      const actual = TasksCollection.find(selector).count()

      assert.strictEqual(actual, 1)
    })

    it('resume task', function() {
      const assign = Object.assign({}, taskDocument, { isTickedOff: true })
      const documentId = TasksCollection.insert(assign)
      const selector: Mongo.Selector<TaskDocument> = { isTickedOff: false }
      const methodHandler =
        Meteor.server.method_handlers[PLANNING_TASK_RESUME_METHOD]
      const resumeTaskDto = new ResumeTaskDto(documentId)

      methodHandler.apply({}, [resumeTaskDto])
      const actual = TasksCollection.find(selector).count()

      assert.strictEqual(actual, 1)
    })

    it('edit task description', function() {
      const documentId = TasksCollection.insert(taskDocument)
      const newText = 'Lorem ispum dolor amet sum'
      const selector: Mongo.Selector<TaskDocument> = { description: newText }
      const methodHandler =
        Meteor.server.method_handlers[PLANNING_TASK_EDIT_METHOD]
      const editTaskDto = new EditTaskDto(documentId, newText)

      methodHandler.apply({}, [editTaskDto])
      const actual = TasksCollection.find(selector).count()

      assert.strictEqual(actual, 1)
    })

    it('archive task', function() {
      const documentId = TasksCollection.insert(taskDocument)
      const selector: Mongo.Selector<TaskDocument> = { isArchived: true }
      const methodHandler =
        Meteor.server.method_handlers[PLANNING_TASK_ARCHIVE_METHOD]
      const archiveTaskDto = new ArchiveTaskDto(documentId)

      methodHandler.apply({}, [archiveTaskDto])
      const actual = TasksCollection.find(selector).count()

      assert.strictEqual(actual, 1)
    })

    it('discard all archived tasks', function() {
      const archivedTaskDocument = Object.assign({}, taskDocument, {
        isArchived: true,
      })
      const taskDocumentId = TasksCollection.insert(archivedTaskDocument)
      const selector: Mongo.Selector<TaskDocument> = { isDiscarded: true }
      const methodHandler =
        Meteor.server.method_handlers[PLANNING_TASK_DISCARD_ALL_ARCHIVE_METHOD]
      const taskUiModel: TaskUiModel = {
        taskId: taskDocumentId,
        description: archivedTaskDocument.description,
        isTickedOff: archivedTaskDocument.isTickedOff,
      }
      const discardArchivedTasksDto = new DiscardArchivedTasksDto([taskUiModel])

      methodHandler.apply({}, [discardArchivedTasksDto])
      const actual = TasksCollection.find(selector).count()

      assert.strictEqual(actual, 1)
    })

    it('discard task', function() {
      const documentId = TasksCollection.insert(taskDocument)
      const selector: Mongo.Selector<TaskDocument> = { isDiscarded: true }
      const methodHandler =
        Meteor.server.method_handlers[PLANNING_TASK_DISCARD_METHOD]
      const discardTaskDto = new DiscardTaskDto(documentId)

      methodHandler.apply({}, [discardTaskDto])
      const actual = TasksCollection.find(selector).count()

      assert.strictEqual(actual, 1)
    })
  })
}
