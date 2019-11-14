import * as Ramda from 'ramda'
import { hasLengthOf, isString } from './validators'
import { ValueObject } from './ValueObject'

interface UniqueIdProps {
  value: string
}

function isValidId(id): boolean {
  return Ramda.allPass([isString, hasLengthOf(17)])(id)
}

export class UniqueId extends ValueObject<UniqueIdProps> {
  private constructor(props: UniqueIdProps) {
    super(props)
  }

  get value(): string {
    return this.props.value
  }

  public static create(id: string): UniqueId {
    if (isValidId(id)) {
      return new UniqueId({ value: id })
    }
  }
}
