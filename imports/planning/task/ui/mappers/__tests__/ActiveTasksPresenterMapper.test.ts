import { TaskDocument } from '../../../api'
import { ActiveTasksPresenter } from '../../presenter'
import { ActiveTasksPresenterMapper } from '../index'

describe('ActiveTasksPresenterMapper', () => {
  test('toPresentation()', () => {
    const docs: TaskDocument[] = [
      {
        _id: 'A',
        ownerId: 'A1',
        description: 'Lorem ipsum',
        createdAt: new Date(),
        isTickedOff: false,
        isDiscarded: false,
        isArchived: false,
      },
      {
        _id: 'B',
        ownerId: 'A1',
        description: 'Lorem ipsum',
        createdAt: new Date(),
        isTickedOff: true,
        isDiscarded: false,
        isArchived: false,
      },
    ]
    const count = docs.length
    const tickedOffTasksCount = docs.filter((doc) => doc.isTickedOff).length

    const presenter = ActiveTasksPresenterMapper.toPresentation(
      docs,
      count,
      tickedOffTasksCount,
    )

    expect(presenter).toBeDefined()
    expect(presenter).toBeInstanceOf(ActiveTasksPresenter)
  })
})
