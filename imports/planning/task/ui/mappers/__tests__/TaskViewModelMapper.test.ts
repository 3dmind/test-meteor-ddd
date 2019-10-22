import { TaskDocument } from '../../../api/TaskCollection'
import { TaskViewModel } from '../../models'
import { TaskViewModelMapper } from '../index'

describe('TaskViewModelMapper', () => {
  test('toPresentation()', () => {
    const doc: TaskDocument = {
      _id: 'A',
      description: 'Lorem ipsum',
      createdAt: new Date(),
      isTickedOff: false,
      isDiscarded: false,
      isArchived: false,
    }

    const viewModel = TaskViewModelMapper.toPresentation(doc)

    expect(viewModel).toBeDefined()
    expect(viewModel).toBeInstanceOf(TaskViewModel)
  })
})
