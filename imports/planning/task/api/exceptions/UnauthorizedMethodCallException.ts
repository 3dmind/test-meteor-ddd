import { StatusEnum } from '../../enums'
import { Exception } from './Exception'

export class UnauthorizedMethodCallException extends Exception {
  constructor(
    message = 'Unauthorized method call',
    error = 'Unauthorized',
    statusCode = StatusEnum.Unauthorized,
  ) {
    super(message, error, statusCode)
  }
}
