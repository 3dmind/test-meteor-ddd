interface TaskViewModelProps {
  id: string
  description: string
  createdAt: Date
  isTickedOff: boolean
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

  static create(props: TaskViewModelProps): TaskViewModel {
    return new TaskViewModel(props)
  }
}
