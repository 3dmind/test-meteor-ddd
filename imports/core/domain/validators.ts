import * as Ramda from 'ramda'

export const isString = (toValidate): boolean => Ramda.is(String, toValidate)

export const isLengthGreaterThen = Ramda.curry(
  (length: number, toValidate): boolean => toValidate.length > length,
)

export const hasLengthOf = Ramda.curry(
  (length: number, toValidate): boolean => toValidate.length === length,
)
