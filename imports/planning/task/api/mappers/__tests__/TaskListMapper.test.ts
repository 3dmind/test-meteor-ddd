import { TaskList, UniqueId } from '../../../domain'
import { TaskDocument } from '../../collections'
import { TaskListMapper, TaskMapper } from '../index'

describe('TaskListMapper', () => {
  const id = UniqueId.create('46o9S4naueKhMtjMu')
  const documents: TaskDocument[] = [
    {
      _id: '46o9S4ukleKhMtjMu',
      ownerId: '0815S4ukleKhMtjMu',
      description: 'Lorem ipsum',
      createdAt: new Date(),
      isArchived: false,
      archivedAt: undefined,
      isDiscarded: false,
      discardedAt: undefined,
      editedAt: undefined,
      isTickedOff: false,
      tickedOffAt: undefined,
      resumedAt: undefined,
    },
    {
      _id: '46o9S4ukleKhsylfp',
      ownerId: '0815S4ukleKhMtjMu',
      description: 'Lorem ipsum',
      createdAt: new Date(),
      isArchived: false,
      archivedAt: undefined,
      isDiscarded: false,
      discardedAt: undefined,
      editedAt: undefined,
      isTickedOff: false,
      tickedOffAt: undefined,
      resumedAt: undefined,
    },
  ]
  const count = documents.length

  test('toDomain()', () => {
    const taskList = TaskListMapper.toDomain(id, documents, count)

    expect(taskList).toBeDefined()
    expect(taskList).toBeInstanceOf(TaskList)
  })

  test('toPersistence()', () => {
    const tasks = documents.map((document) => TaskMapper.toDomain(document))
    const taskList = TaskList.create(id, {
      count,
      tasks,
    })

    const taskDocuments = TaskListMapper.toPersistence(taskList)

    expect(taskDocuments).toEqual([
      [tasks[0].id.value, documents[0]],
      [tasks[1].id.value, documents[1]],
    ])
  })
})
