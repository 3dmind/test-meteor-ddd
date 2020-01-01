import { UniqueEntityID } from '../../../../core/domain'
import { Task } from '../Task'
import { TaskDescription } from '../TaskDescription'

describe('Task', () => {
  const ownerID = UniqueEntityID.create()
  let defaultTaskProps
  let dateSpy: jest.SpyInstance

  beforeAll(() => {
    const description = TaskDescription.create('Lorem upsum')
    defaultTaskProps = {
      ownerID,
      createdAt: new Date(),
      description,
      tickedOff: false,
      tickedOffAt: undefined,
      resumedAt: undefined,
      discarded: false,
      discardedAt: undefined,
      archived: false,
      archivedAt: undefined,
    }
  })

  beforeEach(() => {
    dateSpy = jest.spyOn(global, 'Date').mockName('DateMock')
  })

  afterEach(() => {
    dateSpy.mockRestore()
  })

  test('Task.create()', () => {
    expect.assertions(2)
    const task = Task.create(defaultTaskProps)

    expect(task).toBeDefined()
    expect(task).toBeInstanceOf(Task)
  })

  test('Task.note()', () => {
    expect.assertions(2)
    const description = TaskDescription.create('Lorem upsum')

    const task = Task.note(description, ownerID)

    expect(task).toBeDefined()
    expect(task).toBeInstanceOf(Task)
  })

  describe('equals()', () => {
    const description = TaskDescription.create('Lorem ipsum')
    const taskAProps = Object.assign({}, defaultTaskProps, {
      description: TaskDescription.create('Foo'),
    })
    const taskBProps = Object.assign({}, defaultTaskProps, {
      description: TaskDescription.create('Bar'),
    })
    const entityID = UniqueEntityID.create()
    const taskA = Task.create(taskAProps, entityID)
    const taskB = Task.create(taskBProps, entityID)

    test.each([
      [Task.note(description, ownerID), null, false],
      [Task.note(description, ownerID), undefined, false],
      [Task.note(description, ownerID), {}, false],
      [taskA, taskA, true],
      [taskA, taskB, true],
    ])('%o.equals(%o)', (a: Task, b: Task, expected: boolean) => {
      expect(a.equals(b)).toBe(expected)
    })
  })

  test('get property "id"', () => {
    expect.assertions(1)
    const entityID = UniqueEntityID.create()

    const task = Task.create(defaultTaskProps, entityID)

    expect(task.id).toEqual(entityID)
  })

  test('get property "description"', () => {
    expect.assertions(1)
    const description = TaskDescription.create('Lorem upsum')

    const task = Task.note(description, ownerID)

    expect(task.description).toEqual(description)
  })

  test('get property "createdAt"', () => {
    expect.assertions(1)
    const createdAt = new Date()
    const taskProps = Object.assign({}, defaultTaskProps, {
      createdAt: new Date(),
    })

    const task = Task.create(taskProps)

    expect(task.createdAt).toEqual(createdAt)
  })

  test('tickOff()', () => {
    expect.assertions(1)
    const description = TaskDescription.create('Lorem upsum')
    const task = Task.note(description, ownerID)

    task.tickOff()

    expect(task.isTickedOff()).toBe(true)
  })

  test('get property "tickedOffAt"', () => {
    expect.assertions(1)
    const tickedOffAt = new Date('1970-01-02')
    dateSpy.mockImplementation(() => tickedOffAt)
    const task = Task.create(defaultTaskProps)

    task.tickOff()

    expect(task.tickedOffAt).toEqual(tickedOffAt)
  })

  test('resume()', () => {
    expect.assertions(1)
    const description = TaskDescription.create('Lorem upsum')
    const task = Task.note(description, ownerID)

    task.resume()

    expect(task.isTickedOff()).toBe(false)
  })

  test('get property "resumedAt"', () => {
    expect.assertions(1)
    const tickedOffAt = new Date('1970-01-01')
    const resumedAt = new Date('1970-01-02')
    dateSpy
      .mockImplementationOnce(() => tickedOffAt)
      .mockImplementationOnce(() => resumedAt)
    const task = Task.create(defaultTaskProps)

    task.tickOff()
    task.resume()

    expect(task.resumedAt).toEqual(resumedAt)
  })

  test('edit()', () => {
    expect.assertions(1)
    const description = TaskDescription.create('Lorem ispum')
    const newDescription = TaskDescription.create('Lorem ipsum dolor amet sum')
    const task = Task.note(description, ownerID)

    task.edit(newDescription)

    expect(task.description.value).toEqual(newDescription.value)
  })

  test('get property "editedAt"', () => {
    expect.assertions(1)
    const editedAt = new Date('1970-01-02')
    dateSpy.mockImplementation(() => editedAt)
    const task = Task.create(defaultTaskProps)
    const newDescription = TaskDescription.create('Lorem ipsum dolor amet sum')

    task.edit(newDescription)

    expect(task.editedAt).toEqual(editedAt)
  })

  test('discard()', () => {
    expect.assertions(1)
    const description = TaskDescription.create('Lorem ipsum')
    const task = Task.note(description, ownerID)

    task.discard()

    expect(task.isDiscarded()).toBe(true)
  })

  test('get property "discardedAt"', () => {
    expect.assertions(1)
    const discardedAt = new Date('1970-01-02')
    dateSpy.mockImplementation(() => discardedAt)
    const task = Task.create(defaultTaskProps)

    task.discard()

    expect(task.discardedAt).toEqual(discardedAt)
  })

  test('archive()', () => {
    expect.assertions(1)
    const description = TaskDescription.create('Lorem ipsum')
    const task = Task.note(description, ownerID)

    task.archive()

    expect(task.isArchived()).toBe(true)
  })

  test('get property "archivedAt"', () => {
    expect.assertions(1)
    const archivedAt = new Date('1970-01-02')
    dateSpy.mockImplementation(() => archivedAt)
    const task = Task.create(defaultTaskProps)

    task.archive()

    expect(task.archivedAt).toEqual(archivedAt)
  })

  test('isOwnedByUser()', () => {
    expect.assertions(1)
    const task = Task.create(defaultTaskProps)

    expect(task.isOwnedByUser(ownerID)).toBe(true)
  })

  test('get property "ownerID"', () => {
    expect.assertions(1)
    const task = Task.create(defaultTaskProps)

    expect(task.ownerID).toEqual(ownerID)
  })
})
