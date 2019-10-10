import { TaskUiModel } from './TaskUiModel'

interface ArchivedTasksUiModelProps {
  tasks: TaskUiModel[]
  count: number
}

export class ArchivedTasksUiModel {
  private props: ArchivedTasksUiModelProps

  private constructor(props: ArchivedTasksUiModelProps) {
    this.props = props
  }

  get tasks(): TaskUiModel[] {
    return this.props.tasks
  }

  static create(props: ArchivedTasksUiModelProps): ArchivedTasksUiModel {
    return new ArchivedTasksUiModel(props)
  }

  hasTasks(): boolean {
    return this.props.count > 0
  }
}
