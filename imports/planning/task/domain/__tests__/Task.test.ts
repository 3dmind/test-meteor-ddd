import { UniqueEntityId } from '../../../../core/domain';
import { Task } from '../Task';
import { Description } from '../Description';

describe('Task', () => {
  const ownerId = UniqueEntityId.create();
  let defaultTaskProps;
  let dateSpy: jest.SpyInstance;

  beforeAll(() => {
    const description = Description.create('Lorem upsum').value;
    defaultTaskProps = {
      ownerId,
      createdAt: new Date(),
      description,
      tickedOff: false,
      tickedOffAt: undefined,
      resumedAt: undefined,
      discarded: false,
      discardedAt: undefined,
      archived: false,
      archivedAt: undefined,
    };
  });

  beforeEach(() => {
    dateSpy = jest.spyOn(global, 'Date').mockName('DateMock');
  });

  afterEach(() => {
    dateSpy.mockRestore();
  });

  test('Task.create()', () => {
    expect.assertions(2);
    const task = Task.create(defaultTaskProps);

    expect(task).toBeDefined();
    expect(task).toBeInstanceOf(Task);
  });

  test('Task.note()', () => {
    expect.assertions(2);
    const description = Description.create('Lorem upsum').value;

    const task = Task.note(description, ownerId);

    expect(task).toBeDefined();
    expect(task).toBeInstanceOf(Task);
  });

  describe('equals()', () => {
    const description = Description.create('Lorem ipsum').value;
    const taskAProps = Object.assign({}, defaultTaskProps, {
      description: Description.create('Foo'),
    });
    const taskBProps = Object.assign({}, defaultTaskProps, {
      description: Description.create('Bar'),
    });
    const entityID = UniqueEntityId.create();
    const taskA = Task.create(taskAProps, entityID);
    const taskB = Task.create(taskBProps, entityID);

    test.each([
      [Task.note(description, ownerId), null, false],
      [Task.note(description, ownerId), undefined, false],
      [Task.note(description, ownerId), {}, false],
      [taskA, taskA, true],
      [taskA, taskB, true],
    ])('%o.equals(%o)', (a: Task, b: Task, expected: boolean) => {
      expect(a.equals(b)).toBe(expected);
    });
  });

  test('get property "id"', () => {
    expect.assertions(1);
    const entityID = UniqueEntityId.create();

    const task = Task.create(defaultTaskProps, entityID);

    expect(task.id).toEqual(entityID);
  });

  test('get property "description"', () => {
    expect.assertions(1);
    const description = Description.create('Lorem upsum').value;

    const task = Task.note(description, ownerId);

    expect(task.description).toEqual(description);
  });

  test('get property "createdAt"', () => {
    expect.assertions(1);
    const createdAt = new Date();
    const taskProps = Object.assign({}, defaultTaskProps, {
      createdAt: new Date(),
    });

    const task = Task.create(taskProps);

    expect(task.createdAt).toEqual(createdAt);
  });

  test('tickOff()', () => {
    expect.assertions(1);
    const description = Description.create('Lorem upsum').value;
    const task = Task.note(description, ownerId);

    task.tickOff();

    expect(task.isTickedOff()).toBe(true);
  });

  test('get property "tickedOffAt"', () => {
    expect.assertions(1);
    const tickedOffAt = new Date('1970-01-02');
    dateSpy.mockImplementation(() => tickedOffAt);
    const task = Task.create(defaultTaskProps);

    task.tickOff();

    expect(task.tickedOffAt).toEqual(tickedOffAt);
  });

  test('resume()', () => {
    expect.assertions(1);
    const description = Description.create('Lorem upsum').value;
    const task = Task.note(description, ownerId);

    task.resume();

    expect(task.isTickedOff()).toBe(false);
  });

  test('get property "resumedAt"', () => {
    expect.assertions(1);
    const tickedOffAt = new Date('1970-01-01');
    const resumedAt = new Date('1970-01-02');
    dateSpy
      .mockImplementationOnce(() => tickedOffAt)
      .mockImplementationOnce(() => resumedAt);
    const task = Task.create(defaultTaskProps);

    task.tickOff();
    task.resume();

    expect(task.resumedAt).toEqual(resumedAt);
  });

  test('edit()', () => {
    expect.assertions(1);
    const description = Description.create('Lorem ispum').value;
    const newDescription = Description.create('Lorem ipsum dolor amet sum')
      .value;
    const task = Task.note(description, ownerId);

    task.edit(newDescription);

    expect(task.description.value).toEqual(newDescription.value);
  });

  test('get property "editedAt"', () => {
    expect.assertions(1);
    const editedAt = new Date('1970-01-02');
    dateSpy.mockImplementation(() => editedAt);
    const task = Task.create(defaultTaskProps);
    const newDescription = Description.create('Lorem ipsum dolor amet sum')
      .value;

    task.edit(newDescription);

    expect(task.editedAt).toEqual(editedAt);
  });

  test('discard()', () => {
    expect.assertions(1);
    const description = Description.create('Lorem ipsum').value;
    const task = Task.note(description, ownerId);

    task.discard();

    expect(task.isDiscarded()).toBe(true);
  });

  test('get property "discardedAt"', () => {
    expect.assertions(1);
    const discardedAt = new Date('1970-01-02');
    dateSpy.mockImplementation(() => discardedAt);
    const task = Task.create(defaultTaskProps);

    task.discard();

    expect(task.discardedAt).toEqual(discardedAt);
  });

  test('archive()', () => {
    expect.assertions(1);
    const description = Description.create('Lorem ipsum').value;
    const task = Task.note(description, ownerId);

    task.archive();

    expect(task.isArchived()).toBe(true);
  });

  test('get property "archivedAt"', () => {
    expect.assertions(1);
    const archivedAt = new Date('1970-01-02');
    dateSpy.mockImplementation(() => archivedAt);
    const task = Task.create(defaultTaskProps);

    task.archive();

    expect(task.archivedAt).toEqual(archivedAt);
  });

  test('isOwnedByUser()', () => {
    expect.assertions(1);
    const task = Task.create(defaultTaskProps);

    expect(task.isOwnedByUser(ownerId)).toBe(true);
  });

  test('get property "ownerId"', () => {
    expect.assertions(1);
    const task = Task.create(defaultTaskProps);

    expect(task.ownerID).toEqual(ownerId);
  });
});
