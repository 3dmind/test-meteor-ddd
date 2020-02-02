import * as assert from 'assert';
import { TaskCollectionPublicFields } from '../../../../../../imports/planning/task/api/collections';

describe('TaskCollectionPublicFields', function() {
  it('should contain publicly available fields', function() {
    assert.deepStrictEqual(TaskCollectionPublicFields, {
      ownerId: 1,
      description: 1,
      createdAt: 1,
      editedAt: 1,
      isTickedOff: 1,
      tickedOffAt: 1,
      resumedAt: 1,
      isDiscarded: 1,
      discardedAt: 1,
      isArchived: 1,
      archivedAt: 1,
    });
  });
});
