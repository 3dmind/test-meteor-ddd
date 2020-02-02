import * as assert from 'assert';
import { Meteor } from 'meteor/meteor';
import {
  NoteTaskDto,
  NoteTaskMethodName,
  TaskCollection,
} from '../../../../../../imports/planning/task/api';
import { ApiErrors } from '../../../../../../imports/planning/task/api/api-errors';
import '../../../../../../imports/planning/task/api/methods/noteTask/noteTaskMethod';

import { userIdFixture } from './fixtures';

describe('Note task method', function() {
  let noteTaskMethod;

  before(function() {
    noteTaskMethod = Meteor.server.method_handlers[NoteTaskMethodName];
  });

  beforeEach(function() {
    TaskCollection.remove({});
  });

  it('should throw when user is not logged-in', function() {
    const context = {};
    const dto: NoteTaskDto = { text: 'Lorem ipsum' };

    assert.throws(() => {
      noteTaskMethod.apply(context, [dto]);
    }, ApiErrors.Unauthorized);
  });

  it('should note task', function() {
    const context = Object.assign({}, { userId: userIdFixture });
    const dto: NoteTaskDto = { text: 'Lorem ipsum' };

    noteTaskMethod.apply(context, [dto]);
    const actual = TaskCollection.find().count();

    assert.strictEqual(actual, 1);
  });
});
