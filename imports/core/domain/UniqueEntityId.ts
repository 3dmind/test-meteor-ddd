import * as Ramda from 'ramda'
import { hasLengthOf, isString } from './validators'
import { ValueObject } from './ValueObject'

interface UniqueEntityIdProps {
  value: string
}

function isValidId(id): boolean {
  return Ramda.allPass([isString, hasLengthOf(17)])(id)
}

export class UniqueEntityId extends ValueObject<UniqueEntityIdProps> {
  private constructor(props: UniqueEntityIdProps) {
    super(props)
  }

  get value(): string {
    return this.props.value
  }

  public static create(id: string): UniqueEntityId {
    if (isValidId(id)) {
      return new UniqueEntityId({ value: id })
    }
  }
}
