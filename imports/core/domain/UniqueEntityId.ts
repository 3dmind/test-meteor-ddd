import { ValueObject } from './ValueObject'
import * as Ramda from 'ramda'
import { isString, hasLengthOf } from './validators'

interface UniqueEntityIdProps {
  value: string
}

export class UniqueEntityId extends ValueObject<UniqueEntityIdProps> {
  private constructor(props: UniqueEntityIdProps) {
    super(props)
  }

  get value(): string {
    return this.props.value
  }

  public static create(id: string): UniqueEntityId {
    if (Ramda.allPass([isString, hasLengthOf(17)])) {
      return new UniqueEntityId({ value: id })
    }
  }
}
