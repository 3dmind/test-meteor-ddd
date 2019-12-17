import { UserPresenter } from '../'

describe('UserPresenter', () => {
  const props = {
    userId: '46o9S4ukleKhMtjMu',
    username: 'alice',
  }

  test('get property "username"', () => {
    const presenter = UserPresenter.create(props)

    expect(presenter.username).toEqual(props.username)
  })

  test('isAuthenticated() with authenticated user', () => {
    const presenter = UserPresenter.create(props)

    expect(presenter.isAuthenticated()).toBe(true)
  })

  test('isAuthenticated() with unauthenticated user', () => {
    const presenter = UserPresenter.create({
      userId: undefined,
      username: undefined,
    })

    expect(presenter.isAuthenticated()).toBe(false)
  })
})
