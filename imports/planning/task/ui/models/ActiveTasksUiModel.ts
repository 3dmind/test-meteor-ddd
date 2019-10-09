import { TaskUiModel } from './TaskUiModel'

interface ActiveTasksUiModelProps {
  tasks: TaskUiModel[]
  count: number
  tickOffTasksCount: number
}

export class ActiveTasksUiModel {
  private props: ActiveTasksUiModelProps

  private constructor(props: ActiveTasksUiModelProps) {
    this.props = props
  }

  get tasks(): TaskUiModel[] {
    return this.props.tasks
  }

  static create(props: ActiveTasksUiModelProps): ActiveTasksUiModel {
    return new ActiveTasksUiModel(props)
  }

  hasTasks(): boolean {
    return this.props.count > 0
  }
}
