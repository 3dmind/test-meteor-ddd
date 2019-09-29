import { UniqueEntityId } from '../../../core/domain/UniqueEntityId'
import { TaskDescription } from './TaskDescription'

interface TaskEntityProps {
  description: TaskDescription
  createdAt: Date
  editedAt: undefined | Date

  tickedOff: boolean
  tickedOffAt: undefined | Date
  resumedAt: undefined | Date

  discarded: boolean
  discardedAt: undefined | Date

  archived: boolean
  archivedAt: undefined | Date
}

export class TaskEntity {
  private readonly _id: UniqueEntityId | undefined
  private props: TaskEntityProps

  private constructor(props: TaskEntityProps, id: UniqueEntityId) {
    this._id = id
    this.props = props
  }

  get id(): UniqueEntityId {
    return this._id
  }

  get description(): TaskDescription {
    return this.props.description
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get editedAt(): Date {
    return this.props.editedAt
  }

  get tickedOffAt(): Date {
    return this.props.tickedOffAt
  }

  get resumedAt(): Date {
    return this.props.resumedAt
  }

  get discardedAt(): Date {
    return this.props.discardedAt
  }

  get archivedAt(): Date {
    return this.props.archivedAt
  }

  public static create(
    props: TaskEntityProps,
    id?: UniqueEntityId,
  ): TaskEntity {
    return new TaskEntity(props, id)
  }

  public static note(description: TaskDescription): TaskEntity {
    return TaskEntity.create({
      description,
      createdAt: new Date(),
      editedAt: undefined,

      tickedOff: false,
      tickedOffAt: undefined,
      resumedAt: undefined,

      discarded: false,
      discardedAt: undefined,

      archived: false,
      archivedAt: undefined,
    })
  }

  public equals(object?: TaskEntity): boolean {
    if (object === null || object === undefined) {
      return false
    }

    if (this === object) {
      return true
    }

    if (!(object instanceof TaskEntity)) {
      return false
    }

    if (!this._id) {
      return false
    }

    return this._id.equals(object.id)
  }

  public tickOff(): void {
    if (!this.isTickedOff()) {
      this.props.tickedOff = true
      this.props.tickedOffAt = new Date()
    }
  }

  public isTickedOff(): boolean {
    return this.props.tickedOff
  }

  public resume(): void {
    if (this.isTickedOff()) {
      this.props.tickedOff = false
      this.props.resumedAt = new Date()
    }
  }

  public edit(text: string): void {
    this.props.description = TaskDescription.create(text)
    this.props.editedAt = new Date()
  }

  public discard(): void {
    this.props.discarded = true
    this.props.discardedAt = new Date()
  }

  public isDiscarded(): boolean {
    return this.props.discarded
  }

  public archive(): void {
    this.props.archived = true
    this.props.archivedAt = new Date()
  }

  public isArchived(): boolean {
    return this.props.archived
  }
}
