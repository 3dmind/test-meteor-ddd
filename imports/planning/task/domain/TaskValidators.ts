import * as Ramda from 'ramda'
import { isLengthGreaterThen, isString } from '../../../core/domain/validators'

export const TaskValidators = {
  isValidTaskDescription(text: string): boolean {
    return Ramda.allPass([isString, isLengthGreaterThen(0)])(text)
  },
}

Object.freeze(TaskValidators)
