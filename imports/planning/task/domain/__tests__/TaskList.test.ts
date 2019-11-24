import { TaskList } from '../TaskList'
import { TaskEntity } from '../TaskEntity'
import { UniqueId, TaskDescription } from '../values'

describe('TaskList', () => {
  let task

  beforeEach(() => {
    const taskId = UniqueId.create('46o9S4ukleKhMtjMu')
    task = TaskEntity.create(taskId, {
      ownerId: UniqueId.create('32o9S4ukleKhMtjMu'),
      description: TaskDescription.create('Lorem ipsum'),
      createdAt: new Date(),
      editedAt: undefined,
      tickedOff: false,
      tickedOffAt: undefined,
      resumedAt: undefined,
      discarded: false,
      discardedAt: undefined,
      archived: false,
      archivedAt: undefined,
    })
  })

  test('get property "id"', () => {
    expect.assertions(1)
    const id = UniqueId.create('32ouplukleKhMtjMu')
    const tasks = [task]
    const count = tasks.length

    const taskList = TaskList.create(id, {
      count,
      tasks,
    })

    expect(taskList.id.equals(id)).toBe(true)
  })

  test('toArray()', () => {
    expect.assertions(1)
    const id = UniqueId.create('32ouplukleKhMtjMu')
    const tasks = [task]
    const count = tasks.length
    const taskList = TaskList.create(id, {
      count,
      tasks,
    })

    const taskEntities = taskList.toArray()
    console.log(taskEntities[0] === tasks[0]) //?

    expect(taskEntities).toStrictEqual(tasks)
  })

  test('isEmpty()', () => {
    expect.assertions(1)
    const id = UniqueId.create('32ouplukleKhMtjMu')
    const tasks = [] as TaskEntity[]
    const count = tasks.length

    const taskList = TaskList.create(id, {
      count,
      tasks,
    })

    expect(taskList.isEmpty()).toBe(true)
  })

  test('discardTasks()', () => {
    expect.assertions(1)
    const id = UniqueId.create('32ouplukleKhMtjMu')
    const tasks = [task]
    const count = tasks.length
    const taskList = TaskList.create(id, {
      count,
      tasks,
    })

    taskList.discardTasks()
    const isEveryTaskDiscarded = taskList
      .toArray()
      .every((task) => task.isDiscarded())

    expect(isEveryTaskDiscarded).toBe(true)
  })
})
