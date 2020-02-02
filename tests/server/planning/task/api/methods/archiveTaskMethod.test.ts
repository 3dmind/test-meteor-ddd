import * as assert from 'assert';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import {
  ArchiveTaskDto,
  ArchiveTaskMethodName,
  TaskCollection,
  TaskDocument,
} from '../../../../../../imports/planning/task/api';
import { ApiErrors } from '../../../../../../imports/planning/task/api/api-errors';
import '../../../../../../imports/planning/task/api/methods/archiveTask/archiveTaskMethod';
import { taskDocFixture, userIdFixture } from './fixtures';

describe('Archive task method', function() {
  let archiveTaskMethod;
  let documentId;

  before(function() {
    archiveTaskMethod = Meteor.server.method_handlers[ArchiveTaskMethodName];
  });

  beforeEach(function() {
    documentId = TaskCollection.insert(taskDocFixture);
  });

  afterEach(function() {
    TaskCollection.remove({});
  });

  it('should throw when user is not logged-in', function() {
    const context = {};
    const dto: ArchiveTaskDto = { taskId: documentId };

    assert.throws(() => {
      archiveTaskMethod.apply(context, [dto]);
    }, ApiErrors.Unauthorized);
  });

  it('should throw when task was not found', function() {
    const context = Object.assign({}, { userId: userIdFixture });
    const dto: ArchiveTaskDto = { taskId: 'A' };

    assert.throws(() => {
      archiveTaskMethod.apply(context, [dto]);
    }, ApiErrors.NotFound);
  });

  it('should throw when owner and user do not match', function() {
    const context = Object.assign({}, { userId: 'YanhGvrizEdDzqQEz' });
    const dto: ArchiveTaskDto = { taskId: documentId };

    assert.throws(() => {
      archiveTaskMethod.apply(context, [dto]);
    }, ApiErrors.BadRequest);
  });

  it('should archive task', function() {
    const selector: Mongo.Selector<TaskDocument> = { isArchived: true };
    const context = Object.assign({}, { userId: userIdFixture });
    const dto: ArchiveTaskDto = { taskId: documentId };

    archiveTaskMethod.apply(context, [dto]);
    const actual = TaskCollection.find(selector).count();

    assert.strictEqual(actual, 1);
  });
});
