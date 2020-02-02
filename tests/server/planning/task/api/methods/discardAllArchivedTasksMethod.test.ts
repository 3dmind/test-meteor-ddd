import * as assert from 'assert';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import {
  DiscardAllArchivedTasksMethodName,
  TaskCollection,
  TaskDocument,
} from '../../../../../../imports/planning/task/api';
import { ApiErrors } from '../../../../../../imports/planning/task/api/api-errors';
import '../../../../../../imports/planning/task/api/methods/discardAllArchivedTasks/discardAllArchivedTasksMethod';
import { taskDocFixture, userIdFixture } from './fixtures';

describe('Discard all archived tasks method', function() {
  let discardAllArchivedTasksMethod;

  before(function() {
    discardAllArchivedTasksMethod =
      Meteor.server.method_handlers[DiscardAllArchivedTasksMethodName];
  });

  beforeEach(function() {
    const archivedTaskDocument = Object.assign({}, taskDocFixture, {
      isArchived: true,
    });
    TaskCollection.insert(archivedTaskDocument);
  });

  afterEach(function() {
    TaskCollection.remove({});
  });

  it('should throw when user is not logged-in', function() {
    const context = {};

    assert.throws(() => {
      discardAllArchivedTasksMethod.apply(context);
    }, ApiErrors.Unauthorized);
  });

  it('should throw when no tasks were found', function() {
    const context = Object.assign({}, { userId: userIdFixture });

    TaskCollection.remove({});

    assert.throws(() => {
      discardAllArchivedTasksMethod.apply(context);
    }, ApiErrors.NotFound);
  });

  it('should discard all archived tasks', function() {
    const selector: Mongo.Selector<TaskDocument> = { isDiscarded: true };
    const context = Object.assign({}, { userId: userIdFixture });

    discardAllArchivedTasksMethod.apply(context);
    const actual = TaskCollection.find(selector).count();

    assert.strictEqual(actual, 1);
  });
});
