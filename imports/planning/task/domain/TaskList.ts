import { TaskEntity } from './TaskEntity'
import { UniqueId } from './values'

interface TaskListProps {
  tasks: TaskEntity[]
  count: number
}

export class TaskList {
  private readonly _id: UniqueId
  private readonly props: TaskListProps

  private constructor(id: UniqueId, props: TaskListProps) {
    this._id = id
    this.props = props
  }

  get id(): UniqueId {
    return this._id
  }

  static create(id: UniqueId, props: TaskListProps): TaskList {
    return new TaskList(id, props)
  }

  public equals(object?: TaskList): boolean {
    if (object === null || object === undefined) {
      return false
    }

    if (this === object) {
      return true
    }

    if (!(object instanceof TaskList)) {
      return false
    }

    if (!this._id) {
      return false
    }

    return this._id.equals(object.id)
  }

  public toArray(): TaskEntity[] {
    return Array.from<TaskEntity>(this.props.tasks)
  }

  public isEmpty(): boolean {
    return this.props.count === 0
  }

  public discardTasks(): void {
    this.props.tasks.forEach((task) => task.discard())
  }
}
