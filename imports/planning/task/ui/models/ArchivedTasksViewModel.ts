import { TaskViewModel } from './TaskViewModel'

interface ArchivedTasksViewModelProps {
  tasks: TaskViewModel[]
  count: number
}

export class ArchivedTasksViewModel {
  private props: ArchivedTasksViewModelProps

  private constructor(props: ArchivedTasksViewModelProps) {
    this.props = props
  }

  get tasks(): TaskViewModel[] {
    return this.props.tasks
  }

  static create(props: ArchivedTasksViewModelProps): ArchivedTasksViewModel {
    return new ArchivedTasksViewModel(props)
  }

  hasTasks(): boolean {
    return this.props.count > 0
  }
}
