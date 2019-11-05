import { TaskDocument } from '../../../api/TaskCollection'
import { ArchivedTasksViewModel } from '../../models'
import { ArchivedTasksViewModelMapper } from '../index'

describe('ArchivedTasksViewModelMapper', () => {
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

    const viewModel = ArchivedTasksViewModelMapper.toPresentation(docs, count)

    expect(viewModel).toBeDefined()
    expect(viewModel).toBeInstanceOf(ArchivedTasksViewModel)
  })
})
