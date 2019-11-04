import { ActiveTasksViewModel, TaskViewModel } from '../index'

describe('ActiveTasksViewModel', () => {
  const tasks = [
    TaskViewModel.create({
      id: 'A',
      description: 'Lorem ipsum',
      createdAt: new Date('1977-01-01'),
      isTickedOff: false,
      isArchived: false,
    }),
    TaskViewModel.create({
      id: 'B',
      description: 'Lorem ipsum',
      createdAt: new Date('1977-01-01'),
      isTickedOff: true,
      isArchived: false,
    }),
  ]

  let viewModel: ActiveTasksViewModel

  beforeEach(() => {
    viewModel = ActiveTasksViewModel.create({
      tasks,
      count: tasks.length,
      tickOffTasksCount: tasks.filter((task) => task.isTickedOff).length,
    })
  })

  test('get property "tasks"', () => {
    expect(viewModel.tasks).toEqual(tasks)
  })

  test('#hasTasks()', () => {
    expect(viewModel.hasTasks()).toBe(true)
  })

  describe('property "progress"', () => {
    test('calculate progress for ticked-off tasks', () => {
      expect(viewModel.progress).toEqual(50)
    })
  })
})
