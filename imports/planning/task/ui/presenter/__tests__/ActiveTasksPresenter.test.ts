import { ActiveTasksPresenter, TaskPresenter } from '../index';

describe('ActiveTasksPresenter', () => {
  const tasks = [
    TaskPresenter.create({
      id: 'A',
      description: 'Lorem ipsum',
      createdAt: new Date('1977-01-01'),
      isTickedOff: false,
      isArchived: false,
    }),
    TaskPresenter.create({
      id: 'B',
      description: 'Lorem ipsum',
      createdAt: new Date('1977-01-01'),
      isTickedOff: true,
      isArchived: false,
    }),
  ];

  let presenter: ActiveTasksPresenter;

  beforeEach(() => {
    presenter = ActiveTasksPresenter.create({
      tasks,
      count: tasks.length,
      tickedOffTasksCount: tasks.filter((task) => task.isTickedOff).length,
    });
  });

  test('#hasTasks()', () => {
    expect(presenter.hasTasks()).toBe(true);
  });

  test('allTasks()', () => {
    expect(presenter.allTasks()).toEqual(tasks);
  });

  test('withoutTickedOffTasks()', () => {
    const expected = tasks.filter((task) => !task.isTickedOff);
    expect(presenter.withoutTickedOffTasks()).toEqual(expected);
  });

  describe('property "progress"', () => {
    test('calculate progress for ticked-off tasks', () => {
      expect(presenter.progress).toEqual(50);
    });
  });
});
