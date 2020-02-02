import { TaskDocument } from '../../../api';
import { ArchivedTasksPresenter } from '../../presenter';
import { ArchivedTasksPresenterMapper } from '../index';

describe('ArchivedTasksPresenterMapper', () => {
  test('toPresentation()', () => {
    const docs: TaskDocument[] = [
      {
        _id: 'A',
        ownerId: 'A1',
        description: 'Lorem ipsum',
        createdAt: new Date(),
        isTickedOff: true,
        isDiscarded: false,
        isArchived: true,
      },
      {
        _id: 'B',
        ownerId: 'A1',
        description: 'Lorem ipsum',
        createdAt: new Date(),
        isTickedOff: false,
        isDiscarded: false,
        isArchived: true,
      },
    ];
    const count = docs.length;

    const presenter = ArchivedTasksPresenterMapper.toPresentation(docs, count);

    expect(presenter).toBeDefined();
    expect(presenter).toBeInstanceOf(ArchivedTasksPresenter);
  });
});
