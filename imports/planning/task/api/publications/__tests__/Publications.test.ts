import { Publications } from '../Publications';

describe('Publications', () => {
  test('should contain tasks publication', () => {
    expect.assertions(1);
    const expectedName = 'planning.tasks';

    expect(Publications.Tasks).toBe(expectedName);
  });
});
