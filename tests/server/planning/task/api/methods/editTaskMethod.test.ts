import * as assert from 'assert';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import {
  EditTaskDto,
  EditTaskMethodName,
  TaskCollection,
  TaskDocument,
} from '../../../../../../imports/planning/task/api';
import { ApiErrors } from '../../../../../../imports/planning/task/api/api-errors';
import '../../../../../../imports/planning/task/api/methods/editTask/editTaskMethod';
import { taskDocFixture, userIdFixture } from './fixtures';

describe('Edit task method', function() {
  let editTaskMethod;
  let documentId;

  before(function() {
    editTaskMethod = Meteor.server.method_handlers[EditTaskMethodName];
  });

  beforeEach(function() {
    documentId = TaskCollection.insert(taskDocFixture);
  });

  afterEach(function() {
    TaskCollection.remove({});
  });

  it('should throw when user is not logged-in', function() {
    const newText = 'Lorem ispum dolor amet sum';
    const context = {};
    const dto: EditTaskDto = {
      taskId: documentId,
      newText,
    };

    assert.throws(() => {
      editTaskMethod.apply(context, [dto]);
    }, ApiErrors.Unauthorized);
  });

  it('should throw when task was not found', function() {
    const newText = 'Lorem ispum dolor amet sum';
    const context = Object.assign({}, { userId: userIdFixture });
    const dto: EditTaskDto = {
      taskId: 'A',
      newText,
    };

    assert.throws(() => {
      editTaskMethod.apply(context, [dto]);
    }, ApiErrors.NotFound);
  });

  it('should throw when owner and user do not match', function() {
    const newText = 'Lorem ispum dolor amet sum';
    const context = Object.assign({}, { userId: 'YanhGvrizEdDzqQEz' });
    const dto: EditTaskDto = {
      taskId: documentId,
      newText,
    };

    assert.throws(() => {
      editTaskMethod.apply(context, [dto]);
    }, ApiErrors.Forbidden);
  });

  it('should edit task description', function() {
    const newText = 'Lorem ispum dolor amet sum';
    const selector: Mongo.Selector<TaskDocument> = { description: newText };
    const context = Object.assign({}, { userId: userIdFixture });
    const dto: EditTaskDto = {
      taskId: documentId,
      newText,
    };

    editTaskMethod.apply(context, [dto]);
    const actual = TaskCollection.find(selector).count();

    assert.strictEqual(actual, 1);
  });
});
