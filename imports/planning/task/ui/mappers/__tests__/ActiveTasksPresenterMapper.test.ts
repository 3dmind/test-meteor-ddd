import { TaskDocument } from '../../../api/TaskCollection'
import { ActiveTasksPresenter } from '../../presenter'
import { ActiveTasksPresenterMapper } from '../index'

describe('ActiveTasksPresenterMapper', () => {
  test('toPresentation()', () => {
    const docs: TaskDocument[] = [
      {
        _id: 'A',
        description: 'Lorem ipsum',
        createdAt: new Date(),
        isTickedOff: false,
        isDiscarded: false,
        isArchived: false,
      },
      {
        _id: 'B',
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
