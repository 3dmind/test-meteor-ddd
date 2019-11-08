import { TaskViewModel } from './TaskViewModel'

interface ArchivedTasksProps {
  tasks: TaskViewModel[]
  count: number
}

export class ArchivedTasksPresenter {
  private props: ArchivedTasksProps

  private constructor(props: ArchivedTasksProps) {
    this.props = props
  }

  get tasks(): TaskViewModel[] {
    return this.props.tasks
  }

  static create(props: ArchivedTasksProps): ArchivedTasksPresenter {
    return new ArchivedTasksPresenter(props)
  }

  hasTasks(): boolean {
    return this.props.count > 0
  }
}
