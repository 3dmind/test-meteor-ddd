import * as assert from 'assert'
import { taskPublicFields } from '../../../../../imports/planning/task/api/TasksCollection'

describe('TasksCollection', function() {
  it('#taskPublicFields', function() {
    assert.deepStrictEqual(taskPublicFields, {
      description: 1,
      createdAt: 1,
      editedAt: 1,
      isTickedOff: 1,
      tickedOffAt: 1,
      resumedAt: 1,
      isArchived: 1,
      archivedAt: 1,
    })
  })
})
