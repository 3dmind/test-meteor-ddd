import { TaskViewModel } from './TaskViewModel'

interface ActiveTasksViewModelProps {
  tasks: TaskViewModel[]
  count: number
  tickOffTasksCount: number
}

export class ActiveTasksViewModel {
  private props: ActiveTasksViewModelProps

  private constructor(props: ActiveTasksViewModelProps) {
    this.props = props
  }

  get tasks(): TaskViewModel[] {
    return this.props.tasks
  }

  get progress(): number {
    return (this.props.tickOffTasksCount * 100) / this.props.count
  }

  static create(props: ActiveTasksViewModelProps): ActiveTasksViewModel {
    return new ActiveTasksViewModel(props)
  }

  hasTasks(): boolean {
    return this.props.count > 0
  }
}
