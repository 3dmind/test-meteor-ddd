import * as assert from 'assert';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import {
  DiscardTaskDto,
  DiscardTaskMethodName,
  TaskCollection,
  TaskDocument,
} from '../../../../../../imports/planning/task/api';
import { ApiErrors } from '../../../../../../imports/planning/task/api/api-errors';
import '../../../../../../imports/planning/task/api/methods/discardTask/discardTaskMethod';
import { taskDocFixture, userIdFixture } from './fixtures';

describe('Discard task method', function() {
  let discardTaskMethod;
  let documentId;

  before(function() {
    discardTaskMethod = Meteor.server.method_handlers[DiscardTaskMethodName];
  });

  beforeEach(function() {
    documentId = TaskCollection.insert(taskDocFixture);
  });

  afterEach(function() {
    TaskCollection.remove({});
  });

  it('should throw when user is not logged-in', function() {
    const context = {};
    const dto: DiscardTaskDto = { taskId: documentId };

    assert.throws(() => {
      discardTaskMethod.apply(context, [dto]);
    }, ApiErrors.Unauthorized);
  });

  it('should throw when task was not found', function() {
    const context = Object.assign({}, { userId: userIdFixture });
    const dto: DiscardTaskDto = { taskId: 'A' };

    assert.throws(() => {
      discardTaskMethod.apply(context, [dto]);
    }, ApiErrors.NotFound);
  });

  it('should throw when owner and user do not match', function() {
    const context = Object.assign({}, { userId: 'YanhGvrizEdDzqQEz' });
    const dto: DiscardTaskDto = { taskId: documentId };

    assert.throws(() => {
      discardTaskMethod.apply(context, [dto]);
    }, ApiErrors.BadRequest);
  });

  it('should discard task', function() {
    const selector: Mongo.Selector<TaskDocument> = { isDiscarded: true };
    const context = Object.assign({}, { userId: userIdFixture });
    const dto: DiscardTaskDto = { taskId: documentId };

    discardTaskMethod.apply(context, [dto]);
    const actual = TaskCollection.find(selector).count();

    assert.strictEqual(actual, 1);
  });
});
