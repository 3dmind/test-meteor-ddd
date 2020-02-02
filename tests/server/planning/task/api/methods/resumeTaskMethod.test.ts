import * as assert from 'assert';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import {
  ResumeTaskDto,
  ResumeTaskMethodName,
  TaskCollection,
  TaskDocument,
} from '../../../../../../imports/planning/task/api';
import { ApiErrors } from '../../../../../../imports/planning/task/api/api-errors';
import { taskDocFixture, userIdFixture } from './fixtures';

describe('Resume task method', function() {
  let resumeTaskMethod;
  let documentId;

  before(function() {
    resumeTaskMethod = Meteor.server.method_handlers[ResumeTaskMethodName];
  });

  beforeEach(function() {
    const document = Object.assign({}, taskDocFixture, { isTickedOff: true });
    documentId = TaskCollection.insert(document);
  });

  afterEach(function() {
    TaskCollection.remove({});
  });

  it('should throw when user is not logged-in', function() {
    const context = {};
    const dto: ResumeTaskDto = { taskId: documentId };

    assert.throws(() => {
      resumeTaskMethod.apply(context, [dto]);
    }, ApiErrors.Unauthorized);
  });

  it('should throw when task was not found', function() {
    const context = Object.assign({}, { userId: userIdFixture });
    const dto: ResumeTaskDto = { taskId: 'A' };

    assert.throws(() => {
      resumeTaskMethod.apply(context, [dto]);
    }, ApiErrors.NotFound);
  });

  it('should throw when owner and user do not match', function() {
    const context = Object.assign({}, { userId: 'YanhGvrizEdDzqQEz' });
    const dto: ResumeTaskDto = { taskId: documentId };

    assert.throws(() => {
      resumeTaskMethod.apply(context, [dto]);
    }, ApiErrors.BadRequest);
  });

  it('should resume task', function() {
    const selector: Mongo.Selector<TaskDocument> = { isTickedOff: false };
    const context = Object.assign({}, { userId: userIdFixture });
    const dto: ResumeTaskDto = { taskId: documentId };

    resumeTaskMethod.apply(context, [dto]);
    const actual = TaskCollection.find(selector).count();

    assert.strictEqual(actual, 1);
  });
});
