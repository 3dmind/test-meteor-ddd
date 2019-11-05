interface TaskViewModelProps {
  id: string
  description: string
  createdAt: Date
  isTickedOff: boolean
  tickedOffAt?: Date
  isArchived: boolean
  archivedAt?: Date
}

export class TaskViewModel {
  static dateFormatter = new Intl.DateTimeFormat(navigator.language, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })

  private readonly props: TaskViewModelProps

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
    return TaskViewModel.dateFormatter.format(this.props.createdAt)
  }

  get isTickedOff(): boolean {
    return this.props.isTickedOff
  }

  get tickedOffAtFormatted(): string {
    const { tickedOffAt, isTickedOff } = this.props
    if (!isTickedOff) {
      return ''
    }
    return TaskViewModel.dateFormatter.format(tickedOffAt)
  }

  get isArchived(): boolean {
    return this.props.isArchived
  }

  get archivedAtFormatted(): string {
    const { archivedAt, isArchived } = this.props
    if (!isArchived) {
      return ''
    }
    return TaskViewModel.dateFormatter.format(archivedAt)
  }

  static create(props: TaskViewModelProps): TaskViewModel {
    return new TaskViewModel(props)
  }
}
