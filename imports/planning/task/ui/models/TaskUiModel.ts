interface TaskUiModelProps {
  id: string
  description: string
  isTickedOff: boolean
}

export class TaskUiModel {
  private props: TaskUiModelProps

  private constructor(props: TaskUiModelProps) {
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

  static create(props: TaskUiModelProps): TaskUiModel {
    return new TaskUiModel(props)
  }
}
