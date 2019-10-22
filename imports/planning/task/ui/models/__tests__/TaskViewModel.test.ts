import { TaskViewModel } from '../index'

describe('TaskViewModel', () => {
  const props = {
    id: 'A',
    description: 'Lorem ipsum',
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
})
