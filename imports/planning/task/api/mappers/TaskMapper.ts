import { TaskDescription, TaskEntity, UniqueId } from '../../domain'
import { TaskDocument } from '../collections'

export const TaskMapper = {
  toPersistence(task: TaskEntity): TaskDocument {
    return {
      _id: task.id.value,
      ownerId: task.ownerId.value,
      description: task.description.value,
      createdAt: task.createdAt,
      editedAt: task.editedAt,
      isTickedOff: task.isTickedOff(),
      tickedOffAt: task.tickedOffAt,
      resumedAt: task.resumedAt,
      isDiscarded: task.isDiscarded(),
      discardedAt: task.discardedAt,
      isArchived: task.isArchived(),
      archivedAt: task.archivedAt,
    }
  },

  toDomain(doc: TaskDocument): TaskEntity {
    return TaskEntity.create(UniqueId.create(doc._id), {
      ownerId: UniqueId.create(doc.ownerId),
      description: TaskDescription.create(doc.description),
      createdAt: doc.createdAt,
      resumedAt: doc.resumedAt,
      tickedOff: doc.isTickedOff,
      tickedOffAt: doc.tickedOffAt,
      editedAt: doc.editedAt,
      discarded: doc.isDiscarded,
      discardedAt: doc.discardedAt,
      archived: doc.isArchived,
      archivedAt: doc.archivedAt,
    })
  },
}

Object.freeze(TaskMapper)
