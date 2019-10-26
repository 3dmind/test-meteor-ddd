import { ArchivedTasksViewModel, TaskViewModel } from '../index'

describe('ArchivedTasksViewModel', () => {
  const tasks = [
    TaskViewModel.create({
      id: 'A',
      description: 'Lorem ipsum',
      createdAt: new Date('1977-01-01'),
      isTickedOff: false,
    }),
    TaskViewModel.create({
      id: 'B',
      description: 'Lorem ipsum',
      createdAt: new Date('1977-01-01'),
      isTickedOff: true,
    }),
  ]

  let viewModel: ArchivedTasksViewModel

  beforeEach(() => {
    viewModel = ArchivedTasksViewModel.create({
      tasks,
      count: tasks.length,
    })
  })

  test('get property "tasks"', () => {
    expect(viewModel.tasks).toEqual(tasks)
  })

  test('#hasTasks()', () => {
    expect(viewModel.hasTasks()).toBe(true)
  })
})
