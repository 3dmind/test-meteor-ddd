import { Entity, UniqueEntityId } from '../../../core/domain';

export class TaskOwnerId extends Entity<any> {
  get id(): UniqueEntityId {
    return this._id;
  }

  private constructor(id: UniqueEntityId) {
    super(null, id);
  }

  public static create(id: UniqueEntityId): TaskOwnerId {
    return new TaskOwnerId(id);
  }
}
