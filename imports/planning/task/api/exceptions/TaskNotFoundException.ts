import { ApiException } from './ApiException'
import { Status } from './Status'

export class TaskNotFoundException extends ApiException {
  constructor(
    message = 'Task was not found',
    error = 'Not found',
    statusCode = Status.NotFound,
  ) {
    super(message, error, statusCode)
  }
}
