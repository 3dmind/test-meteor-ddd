import { ActiveTasksPresenter, TaskViewModel } from '../index'

describe('ActiveTasksPresenter', () => {
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

  let presenter: ActiveTasksPresenter

  beforeEach(() => {
    presenter = ActiveTasksPresenter.create({
      tasks,
      count: tasks.length,
      tickedOffTasksCount: tasks.filter((task) => task.isTickedOff).length,
    })
  })

  test('get property "tasks"', () => {
    expect(presenter.tasks).toEqual(tasks)
  })

  test('#hasTasks()', () => {
    expect(presenter.hasTasks()).toBe(true)
  })

  describe('property "progress"', () => {
    test('calculate progress for ticked-off tasks', () => {
      expect(presenter.progress).toEqual(50)
    })
  })
})
