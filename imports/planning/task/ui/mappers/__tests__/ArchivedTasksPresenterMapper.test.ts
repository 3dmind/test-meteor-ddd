import { TaskDocument } from '../../../api/TaskCollection'
import { ArchivedTasksPresenter } from '../../models'
import { ArchivedTasksPresenterMapper } from '../index'

describe('ArchivedTasksPresenterMapper', () => {
  test('toPresentation()', () => {
    const docs: TaskDocument[] = [
      {
        _id: 'A',
        description: 'Lorem ipsum',
        createdAt: new Date(),
        isTickedOff: true,
        isDiscarded: false,
        isArchived: true,
      },
      {
        _id: 'B',
        description: 'Lorem ipsum',
        createdAt: new Date(),
        isTickedOff: false,
        isDiscarded: false,
        isArchived: true,
      },
    ]
    const count = docs.length

    const presenter = ArchivedTasksPresenterMapper.toPresentation(docs, count)

    expect(presenter).toBeDefined()
    expect(presenter).toBeInstanceOf(ArchivedTasksPresenter)
  })
})
