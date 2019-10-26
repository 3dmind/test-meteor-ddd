interface TaskViewModelProps {
  id: string
  description: string
  createdAt: Date
  isTickedOff: boolean
  tickedOffAt?: Date
}

export class TaskViewModel {
  private props: TaskViewModelProps

  private constructor(props: TaskViewModelProps) {
    this.props = props
  }

  get id(): string {
    return this.props.id
  }

  get description(): string {
    return this.props.description
  }

  get createdAtFormatted(): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }
    return new Intl.DateTimeFormat(navigator.language, options).format(
      this.props.createdAt,
    )
  }

  get isTickedOff(): boolean {
    return this.props.isTickedOff
  }

  get tickedOffAtFormatted(): string {
    const { tickedOffAt, isTickedOff } = this.props
    if (!isTickedOff) {
      return ''
    }

    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }
    return new Intl.DateTimeFormat(navigator.language, options).format(
      tickedOffAt,
    )
  }

  static create(props: TaskViewModelProps): TaskViewModel {
    return new TaskViewModel(props)
  }
}
