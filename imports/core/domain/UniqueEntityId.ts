import { Random } from 'meteor/random';
import Ramda from 'ramda';

export class UniqueEntityId {
  private readonly _value: string;

  private constructor(id: string) {
    this._value = id;
  }

  get value(): string {
    return this._value;
  }

  equals(id?: UniqueEntityId): boolean {
    if (Ramda.isNil(id)) {
      return false;
    }

    if (!Ramda.is(UniqueEntityId, id)) {
      return false;
    }

    return id.value === this._value;
  }

  static create(id?: string): UniqueEntityId {
    return new UniqueEntityId(id ? id : Random.id());
  }
}
