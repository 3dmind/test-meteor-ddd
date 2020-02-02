import { TaskPresenter } from '../index';

describe('TaskPresenter', () => {
  const props = {
    id: 'A',
    description: 'Lorem ipsum',
    createdAt: new Date('1977-01-01'),
    isTickedOff: false,
    isArchived: false,
  };

  test('get property "id"', () => {
    const presenter = TaskPresenter.create(props);

    expect(presenter.id).toEqual(props.id);
  });

  test('get property "description"', () => {
    const presenter = TaskPresenter.create(props);

    expect(presenter.description).toEqual(props.description);
  });

  test('get property "isTickedOff"', () => {
    const presenter = TaskPresenter.create(props);

    expect(presenter.isTickedOff).toEqual(props.isTickedOff);
  });

  test('get property "createdAtFormatted"', () => {
    const spy = jest.spyOn(navigator, 'language', 'get');
    spy.mockReturnValue('en-US');
    const expectedFormat = 'Sat, Jan 1';

    const presenter = TaskPresenter.create(props);

    expect(presenter.createdAtFormatted).toEqual(expectedFormat);

    spy.mockRestore();
  });

  test('get property tickedOffAtFormatted', () => {
    const spy = jest.spyOn(navigator, 'language', 'get');
    spy.mockReturnValue('en-US');
    const expectedFormat = 'Sun, Jan 2';
    const localProps = Object.assign({}, props, {
      isTickedOff: true,
      tickedOffAt: new Date('1977-01-02'),
    });

    const presenter = TaskPresenter.create(localProps);

    expect(presenter.tickedOffAtFormatted).toEqual(expectedFormat);

    spy.mockRestore();
  });

  test('get property "isArchived"', () => {
    const presenter = TaskPresenter.create(props);

    expect(presenter.isArchived).toEqual(props.isArchived);
  });

  test('get property archivedAtFormatted', () => {
    const spy = jest.spyOn(navigator, 'language', 'get');
    spy.mockReturnValue('en-US');
    const expectedFormat = 'Mon, Jan 3';
    const localProps = Object.assign({}, props, {
      isArchived: true,
      archivedAt: new Date('1977-01-03'),
    });

    const presenter = TaskPresenter.create(localProps);

    expect(presenter.archivedAtFormatted).toEqual(expectedFormat);

    spy.mockRestore();
  });
});
