interface TaskViewModelProps {
  id: string
  description: string
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

  get isTickedOff(): boolean {
    return this.props.isTickedOff
  }

  static create(props: TaskViewModelProps): TaskViewModel {
    return new TaskViewModel(props)
  }
}
