import { TaskDocument } from '../../../api/TaskCollection'
import { TaskPresenter } from '../../presenter'
import { TaskPresenterMapper } from '../index'

describe('TaskPresenterMapper', () => {
  test('toPresentation()', () => {
    const doc: TaskDocument = {
      _id: 'A',
      ownerId: 'A1',
      description: 'Lorem ipsum',
      createdAt: new Date(),
      isTickedOff: false,
      isDiscarded: false,
      isArchived: false,
    }

    const presenter = TaskPresenterMapper.toPresentation(doc)

    expect(presenter).toBeDefined()
    expect(presenter).toBeInstanceOf(TaskPresenter)
  })
})
