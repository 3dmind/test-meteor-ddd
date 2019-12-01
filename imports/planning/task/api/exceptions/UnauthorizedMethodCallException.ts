import { ApiException } from './ApiException'
import { Status } from './Status'

export class UnauthorizedMethodCallException extends ApiException {
  constructor(
    message = 'Unauthorized method call',
    error = 'Unauthorized',
    statusCode = Status.Unauthorized,
  ) {
    super(message, error, statusCode)
  }
}
