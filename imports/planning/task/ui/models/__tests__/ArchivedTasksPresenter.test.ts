import { ArchivedTasksPresenter, TaskViewModel } from '../index'

describe('ArchivedTasksPresenter', () => {
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

  let presenter: ArchivedTasksPresenter

  beforeEach(() => {
    presenter = ArchivedTasksPresenter.create({
      tasks,
      count: tasks.length,
    })
  })

  test('get property "tasks"', () => {
    expect(presenter.tasks).toEqual(tasks)
  })

  test('#hasTasks()', () => {
    expect(presenter.hasTasks()).toBe(true)
  })
})
