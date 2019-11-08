import { TaskViewModel } from './TaskViewModel'

interface ActiveTasksProps {
  tasks: TaskViewModel[]
  count: number
  tickedOffTasksCount: number
}

export class ActiveTasksPresenter {
  private props: ActiveTasksProps

  private constructor(props: ActiveTasksProps) {
    this.props = props
  }

  get tasks(): TaskViewModel[] {
    return this.props.tasks
  }

  get progress(): number {
    return (this.props.tickedOffTasksCount * 100) / this.props.count
  }

  static create(props: ActiveTasksProps): ActiveTasksPresenter {
    return new ActiveTasksPresenter(props)
  }

  hasTasks(): boolean {
    return this.props.count > 0
  }
}
