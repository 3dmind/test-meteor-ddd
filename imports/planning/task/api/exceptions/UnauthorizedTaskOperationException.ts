import { ApiException } from './ApiException';
import { Status } from './Status';

export class UnauthorizedTaskOperationException extends ApiException {
  constructor(
    message = 'Authorisation is required to perform this task operation',
    error = 'Unauthorized',
    statusCode = Status.Unauthorized,
  ) {
    super(message, error, statusCode);
  }
}
