import { UniqueId } from '../../../core/domain'
import { TaskDescription } from '../domain/TaskDescription'
import { TaskEntity } from '../domain/TaskEntity'
import { TaskDocument } from './TaskCollection'

export const TaskMapper = {
  toPersistence(task: TaskEntity): TaskDocument {
    const document: TaskDocument = {
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

    if (task.id) {
      Object.assign(document, { _id: task.id.value })
    }

    return document
  },

  toDomain(doc: TaskDocument): TaskEntity {
    return TaskEntity.create(
      {
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
      },
      UniqueId.create(doc._id),
    )
  },
}

Object.freeze(TaskMapper)
