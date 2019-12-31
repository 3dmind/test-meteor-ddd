import { TaskDescription } from '../TaskDescription'

describe('TaskDescription', () => {
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ])('%o.equals(%o)', (a: string, b: any, expected: boolean) => {
    const description = TaskDescription.create(a)
    expect(description.equals(b)).toBe(expected)
  })
})
