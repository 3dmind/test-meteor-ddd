import { StatusEnum } from '../../enums'
import { Exception } from './Exception'

export class UnauthorizedTaskOperationException extends Exception {
  constructor(
    message = 'Authorisation is required to perform this task operation',
    error = 'Unauthorized',
    statusCode = StatusEnum.Unauthorized,
  ) {
    super(message, error, statusCode)
  }
}
