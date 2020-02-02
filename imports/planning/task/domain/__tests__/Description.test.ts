import { Description } from '../Description';

describe('Description', () => {
  describe('create()', () => {
    test('should create description from valid text', () => {
      const text = 'Lorem ipsum';

      const descriptionOrError = Description.create(text);

      expect(descriptionOrError.isSuccess).toBe(true);
      expect(descriptionOrError.value).toBeInstanceOf(Description);
    });

    test('should fail if text is not defined', () => {
      const text = null;
      const expectedError = `Task description text can't be 'null' or 'undefined'`;

      const descriptionOrError = Description.create(text);

      expect(descriptionOrError.isFailure).toBe(true);
      expect(descriptionOrError.error).toStrictEqual(expectedError);
    });

    test('should fail if text is invalid', () => {
      const text = '';
      const expectedError = 'Task description text is not valid.';

      const descriptionOrError = Description.create(text);

      expect(descriptionOrError.isFailure).toBe(true);
      expect(descriptionOrError.error).toStrictEqual(expectedError);
    });
  });

  test('get property "value"', () => {
    const text = 'Lorem ipsum';

    const description = Description.create(text).value;

    expect(description.value).toBe(text);
  });

  describe('equals()', () => {
    test.each([
      ['Lorem ipsum', null, false],
      ['Lorem ipsum', undefined, false],
      ['Lorem ipsum', { props: undefined }, false],
    ])('%o.equals(%o)', (a: string, b: Description, expected: boolean) => {
      const description = Description.create(a).value;
      expect(description.equals(b)).toBe(expected);
    });
  });
});
