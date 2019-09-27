import { TaskValidators } from '../TaskValidators'
import { TaskDescription } from '../TaskDescription'

jest.mock('../TaskValidators')
const MockedTaskValidators = TaskValidators as jest.Mocked<
  typeof TaskValidators
>

describe('TaskDescription', () => {
  beforeAll(() => {
    MockedTaskValidators.isValidTaskDescription.mockReturnValue(true)
  })

  afterEach(() => {
    MockedTaskValidators.isValidTaskDescription.mockClear()
  })

  afterAll(() => {
    MockedTaskValidators.isValidTaskDescription.mockRestore()
  })

  test('#create()', () => {
    const text = 'Lorem ipsum'

    const description = TaskDescription.create(text)

    expect(description).toBeDefined()
  })

  test('#value', () => {
    const text = 'Lorem ipsum'

    const description = TaskDescription.create(text)

    expect(description.value).toBe(text)
  })

  test.each([
    ['Lorem ipsum', null, false],
    ['Lorem ipsum', undefined, false],
    ['Lorem ipsum', { props: undefined }, false],
  ])('%o.equals(%o)', (a: string, b: any, expected: boolean) => {
    const description = TaskDescription.create(a)
    expect(description.equals(b)).toBe(expected)
  })
})
