import * as Ramda from 'ramda'

const notIsNil = Ramda.complement(Ramda.isNil)

interface ApplicationProps {
  userId: string
  username: string
}

export class ApplicationPresenter {
  private readonly props: ApplicationProps

  private constructor(props: ApplicationProps) {
    this.props = props
  }

  static create(props: ApplicationProps): ApplicationPresenter {
    return new ApplicationPresenter(props)
  }

  get username(): string {
    return this.props.username
  }

  public isAuthenticated(): boolean {
    return notIsNil(this.props.userId)
  }
}
