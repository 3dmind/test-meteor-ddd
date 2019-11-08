import { TaskPresenter } from './TaskPresenter'

interface ArchivedTasksProps {
  tasks: TaskPresenter[]
  count: number
}

export class ArchivedTasksPresenter {
  private props: ArchivedTasksProps

  private constructor(props: ArchivedTasksProps) {
    this.props = props
  }

  get tasks(): TaskPresenter[] {
    return this.props.tasks
  }

  static create(props: ArchivedTasksProps): ArchivedTasksPresenter {
    return new ArchivedTasksPresenter(props)
  }

  hasTasks(): boolean {
    return this.props.count > 0
  }
}
