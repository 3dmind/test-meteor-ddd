import * as Ramda from 'ramda'

const notIsNil = Ramda.complement(Ramda.isNil)

interface UserProps {
  userId: string
  username: string
}

export class UserPresenter {
  private readonly props: UserProps

  private constructor(props: UserProps) {
    this.props = props
  }

  static create(props: UserProps): UserPresenter {
    return new UserPresenter(props)
  }

  get username(): string {
    return this.props.username
  }

  public isAuthenticated(): boolean {
    return notIsNil(this.props.userId)
  }
}
