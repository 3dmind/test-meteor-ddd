import { Entity, UniqueEntityID } from '../../../core/domain'
import { Task } from './Task'

interface TaskListProps {
  tasks: Task[]
  count: number
}

export class TaskList extends Entity<TaskListProps> {
  constructor(props: TaskListProps, id?: UniqueEntityID) {
    super(props, id)
  }

  get id(): UniqueEntityID {
    return this._id
  }

  static create(props: TaskListProps, id?: UniqueEntityID): TaskList {
    return new TaskList(props, id)
  }

  public toArray(): Task[] {
    return Array.from<Task>(this.props.tasks)
  }

  public isEmpty(): boolean {
    return this.props.count === 0
  }

  public discardTasks(): void {
    this.props.tasks.forEach((task) => task.discard())
  }
}
