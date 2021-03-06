import { UniqueEntityId } from '../../../../../core/domain';
import { Task, Description, TaskOwnerId } from '../../../domain';
import { TaskDocument } from '../../collections';
import { TaskMapper } from '../index';

describe('TaskMapper', () => {
  test('toDomain()', () => {
    expect.assertions(12);
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
    };

    const task = TaskMapper.toDomain(document);

    expect(task.id.value).toEqual(document._id);
    expect(task.taskOwnerId.id.value).toEqual(document.ownerId);
    expect(task.description.value).toEqual(document.description);
    expect(task.createdAt).toEqual(document.createdAt);
    expect(task.isArchived()).toEqual(document.isArchived);
    expect(task.archivedAt).toEqual(document.archivedAt);
    expect(task.isDiscarded()).toEqual(document.isDiscarded);
    expect(task.discardedAt).toEqual(document.discardedAt);
    expect(task.editedAt).toEqual(document.editedAt);
    expect(task.isTickedOff()).toEqual(document.isTickedOff);
    expect(task.tickedOffAt).toEqual(document.tickedOffAt);
    expect(task.resumedAt).toEqual(document.resumedAt);
  });

  test('toPersistence', () => {
    expect.assertions(12);
    const id = UniqueEntityId.create('46o9S4ukleKhMtjMu');
    const taskOwnerId = TaskOwnerId.create(
      UniqueEntityId.create('0815S4ukleKhMtjMu'),
    );
    const description = Description.create('Lorem ipsum').value;
    const task = Task.create(
      {
        taskOwnerId,
        description,
        createdAt: new Date(),
        editedAt: undefined,
        tickedOff: false,
        tickedOffAt: undefined,
        resumedAt: undefined,
        archived: false,
        archivedAt: undefined,
        discarded: false,
        discardedAt: undefined,
      },
      id,
    );

    const document = TaskMapper.toPersistence(task);

    expect(document._id).toEqual(task.id.value);
    expect(document.ownerId).toEqual(task.taskOwnerId.id.value);
    expect(document.description).toEqual(task.description.value);
    expect(document.createdAt).toEqual(task.createdAt);
    expect(document.isArchived).toEqual(task.isArchived());
    expect(document.archivedAt).toEqual(task.archivedAt);
    expect(document.isDiscarded).toEqual(task.isDiscarded());
    expect(document.discardedAt).toEqual(task.discardedAt);
    expect(document.editedAt).toEqual(task.editedAt);
    expect(document.isTickedOff).toEqual(task.isTickedOff());
    expect(document.tickedOffAt).toEqual(task.tickedOffAt);
    expect(document.resumedAt).toEqual(task.resumedAt);
  });
});
