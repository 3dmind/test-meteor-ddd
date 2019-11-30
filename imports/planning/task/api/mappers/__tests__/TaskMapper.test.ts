import { TaskEntity } from '../../../domain'
import { TaskDescription, UniqueId } from '../../../domain/values'
import { TaskDocument } from '../../TaskCollection'
import { TaskMapper } from '../index'

describe('TaskMapper', () => {
  test('toDomain()', () => {
    expect.assertions(12)
    const document: TaskDocument = {
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
    }

    const taskEntity = TaskMapper.toDomain(document)

    expect(taskEntity.id.value).toEqual(document._id)
    expect(taskEntity.ownerId.value).toEqual(document.ownerId)
    expect(taskEntity.description.value).toEqual(document.description)
    expect(taskEntity.createdAt).toEqual(document.createdAt)
    expect(taskEntity.isArchived()).toEqual(document.isArchived)
    expect(taskEntity.archivedAt).toEqual(document.archivedAt)
    expect(taskEntity.isDiscarded()).toEqual(document.isDiscarded)
    expect(taskEntity.discardedAt).toEqual(document.discardedAt)
    expect(taskEntity.editedAt).toEqual(document.editedAt)
    expect(taskEntity.isTickedOff()).toEqual(document.isTickedOff)
    expect(taskEntity.tickedOffAt).toEqual(document.tickedOffAt)
    expect(taskEntity.resumedAt).toEqual(document.resumedAt)
  })

  test('toPersistence', () => {
    expect.assertions(12)
    const id = UniqueId.create('46o9S4ukleKhMtjMu')
    const ownerId = UniqueId.create('0815S4ukleKhMtjMu')
    const description = TaskDescription.create('Lorem ipsum')
    const taskEntity = TaskEntity.create(id, {
      archived: false,
      archivedAt: undefined,
      createdAt: new Date(),
      description,
      discarded: false,
      discardedAt: undefined,
      editedAt: undefined,
      ownerId,
      resumedAt: undefined,
      tickedOff: false,
      tickedOffAt: undefined,
    })

    const document = TaskMapper.toPersistence(taskEntity)

    expect(document._id).toEqual(taskEntity.id.value)
    expect(document.ownerId).toEqual(taskEntity.ownerId.value)
    expect(document.description).toEqual(taskEntity.description.value)
    expect(document.createdAt).toEqual(taskEntity.createdAt)
    expect(document.isArchived).toEqual(taskEntity.isArchived())
    expect(document.archivedAt).toEqual(taskEntity.archivedAt)
    expect(document.isDiscarded).toEqual(taskEntity.isDiscarded())
    expect(document.discardedAt).toEqual(taskEntity.discardedAt)
    expect(document.editedAt).toEqual(taskEntity.editedAt)
    expect(document.isTickedOff).toEqual(taskEntity.isTickedOff())
    expect(document.tickedOffAt).toEqual(taskEntity.tickedOffAt)
    expect(document.resumedAt).toEqual(taskEntity.resumedAt)
  })
})
