import { TaskDescription, UniqueId } from './values'

interface TaskEntityProps {
  ownerId: UniqueId

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
  private readonly _id: UniqueId | undefined
  private props: TaskEntityProps

  private constructor(props: TaskEntityProps, id: UniqueId) {
    this._id = id
    this.props = props
  }

  get id(): UniqueId {
    return this._id
  }

  get ownerId(): UniqueId {
    return this.props.ownerId
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

  public static create(props: TaskEntityProps, id?: UniqueId): TaskEntity {
    return new TaskEntity(props, id)
  }

  public static note(
    description: TaskDescription,
    ownerId: UniqueId,
  ): TaskEntity {
    return TaskEntity.create({
      ownerId,

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

  public isOwnedByUser(userId: UniqueId): boolean {
    return this.ownerId.equals(userId)
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

  public edit(newTaskDescription: TaskDescription): void {
    this.props.description = newTaskDescription
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
