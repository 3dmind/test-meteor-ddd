import * as Ramda from 'ramda'

export const hasLengthOf = Ramda.curry(
  (length: number, toValidate): boolean => toValidate.length === length,
)
