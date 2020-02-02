import { UniqueEntityId } from '../../../../core/domain';
import { Task, Description } from '../../domain';
import { TaskDocument } from '../collections';

export const TaskMapper = {
  toPersistence(task: Task): TaskDocument {
    return {
      _id: task.id.value,
      ownerId: task.ownerID.value,
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
    };
  },

  toDomain(doc: TaskDocument): Task {
    return Task.create(
      {
        ownerId: UniqueEntityId.create(doc.ownerId),
        description: Description.create(doc.description).value,
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
      UniqueEntityId.create(doc._id),
    );
  },
};

Object.freeze(TaskMapper);
