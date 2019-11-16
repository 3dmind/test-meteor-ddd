import { TaskDocument } from '../../../../../../../imports/planning/task/api/TaskCollection'

export const userIdFixture = '46o9S4ukleKhMtjMu'

export const taskDocFixture: TaskDocument = {
  ownerId: userIdFixture,
  description: 'Lorem ispum',
  createdAt: new Date(),
  isTickedOff: false,
  isDiscarded: false,
  isArchived: false,
}
