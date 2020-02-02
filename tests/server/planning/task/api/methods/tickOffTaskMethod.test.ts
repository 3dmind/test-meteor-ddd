import * as assert from 'assert';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import {
  TaskCollection,
  TaskDocument,
  TickOffTaskDto,
  TickOffTaskMethodName,
} from '../../../../../../imports/planning/task/api';
import { ApiErrors } from '../../../../../../imports/planning/task/api/api-errors';
import '../../../../../../imports/planning/task/api/methods/tickOffTask/tickOffTaskMethod';
import { taskDocFixture, userIdFixture } from './fixtures';

describe('Tick-off task method', function() {
  let tickOffTaskMethod;
  let documentId;

  before(function() {
    tickOffTaskMethod = Meteor.server.method_handlers[TickOffTaskMethodName];
  });

  beforeEach(function() {
    documentId = TaskCollection.insert(taskDocFixture);
  });

  afterEach(function() {
    TaskCollection.remove({});
  });

  it('should throw when user is not logged-in', function() {
    const context = {};
    const dto: TickOffTaskDto = { taskId: documentId };

    assert.throws(() => {
      tickOffTaskMethod.apply(context, [dto]);
    }, ApiErrors.Unauthorized);
  });

  it('should throw when task was not found', function() {
    const context = Object.assign({}, { userId: userIdFixture });
    const dto: TickOffTaskDto = { taskId: 'A' };

    assert.throws(() => {
      tickOffTaskMethod.apply(context, [dto]);
    }, ApiErrors.NotFound);
  });

  it('should throw when owner and user do not match', function() {
    const context = Object.assign({}, { userId: 'YanhGvrizEdDzqQEz' });
    const dto: TickOffTaskDto = { taskId: documentId };

    assert.throws(() => {
      tickOffTaskMethod.apply(context, [dto]);
    }, ApiErrors.Forbidden);
  });

  it('should tick-off task', function() {
    const selector: Mongo.Selector<TaskDocument> = { isTickedOff: true };
    const context = Object.assign({}, { userId: userIdFixture });
    const dto: TickOffTaskDto = { taskId: documentId };

    tickOffTaskMethod.apply(context, [dto]);
    const actual = TaskCollection.find(selector).count();

    assert.strictEqual(actual, 1);
  });
});
