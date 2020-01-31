import { UniqueEntityId } from '../../../../core/domain';
import { Task } from '../Task';
import { Description } from '../Description';
import { TaskList } from '../TaskList';

describe('TaskList', () => {
  let task;

  beforeEach(() => {
    task = Task.create({
      ownerId: UniqueEntityId.create(),
      description: Description.create('Lorem ipsum').value,
      createdAt: new Date(),
      editedAt: undefined,
      tickedOff: false,
      tickedOffAt: undefined,
      resumedAt: undefined,
      discarded: false,
      discardedAt: undefined,
      archived: false,
      archivedAt: undefined,
    });
  });

  test('get property "id"', () => {
    expect.assertions(1);
    const id = UniqueEntityId.create('32ouplukleKhMtjMu');
    const tasks = [task];
    const count = tasks.length;

    const taskList = TaskList.create({ count, tasks }, id);

    expect(taskList.id).toEqual(id);
  });

  test('toArray()', () => {
    expect.assertions(1);
    const tasks = [task];
    const count = tasks.length;
    const taskList = TaskList.create({ count, tasks });

    const taskEntities = taskList.toArray();

    expect(taskEntities).toStrictEqual(tasks);
  });

  test('isEmpty()', () => {
    expect.assertions(1);
    const tasks = [] as Task[];
    const count = tasks.length;

    const taskList = TaskList.create({ count, tasks });

    expect(taskList.isEmpty()).toBe(true);
  });

  test('discardTasks()', () => {
    expect.assertions(1);
    const tasks = [task];
    const count = tasks.length;
    const taskList = TaskList.create({ count, tasks });

    taskList.discardTasks();
    const isEveryTaskDiscarded = taskList
      .toArray()
      .every((task) => task.isDiscarded());

    expect(isEveryTaskDiscarded).toBe(true);
  });
});
