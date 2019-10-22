import { TaskDocument } from '../../../api/TaskCollection'
import { ActiveTasksViewModel } from '../../models'
import { ActiveTasksViewModelMapper } from '../index'

describe('ActiveTasksViewModelMapper', () => {
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
    const tickOffTasksCount = docs.filter((doc) => doc.isTickedOff).length

    const viewModel = ActiveTasksViewModelMapper.toPresentation(
      docs,
      count,
      tickOffTasksCount,
    )

    expect(viewModel).toBeDefined()
    expect(viewModel).toBeInstanceOf(ActiveTasksViewModel)
  })
})
