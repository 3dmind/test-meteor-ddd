import { is } from 'ramda'

export const isString = (toValidate): boolean => is(String, toValidate)
