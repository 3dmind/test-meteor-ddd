import { Random } from 'meteor/random'
import { is, isNil } from 'ramda'

export class UniqueEntityID {
  private readonly _value: string

  private constructor(id: string) {
    this._value = id
  }

  get value(): string {
    return this._value
  }

  equals(id?: UniqueEntityID): boolean {
    if (isNil(id)) {
      return false
    }

    if (!is(UniqueEntityID, id)) {
      return false
    }

    return id.value === this._value
  }

  static create(id?: string): UniqueEntityID {
    return new UniqueEntityID(id ? id : Random.id())
  }
}
