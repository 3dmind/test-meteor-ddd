import { TaskViewModel } from '../index'

describe('TaskViewModel', () => {
  const props = {
    id: 'A',
    description: 'Lorem ipsum',
    createdAt: new Date('1977-01-01'),
    isTickedOff: false,
  }

  test('get property "id"', () => {
    const viewModel = TaskViewModel.create(props)

    expect(viewModel.id).toEqual(props.id)
  })

  test('get property "description"', () => {
    const viewModel = TaskViewModel.create(props)

    expect(viewModel.description).toEqual(props.description)
  })

  test('get property "isTickedOff"', () => {
    const viewModel = TaskViewModel.create(props)

    expect(viewModel.isTickedOff).toEqual(props.isTickedOff)
  })

  test('get property "createdAtFormatted"', () => {
    const spy = jest.spyOn(navigator, 'language', 'get')
    spy.mockReturnValue('en-US')
    const expectedFormat = 'Sat, Jan 1'

    const viewModel = TaskViewModel.create(props)

    expect(viewModel.createdAtFormatted).toEqual(expectedFormat)

    spy.mockRestore()
  })
})
