import { curry } from 'ramda';

export const isLengthGreaterThen = curry(
  (length: number, toValidate): boolean => toValidate.length > length,
);
