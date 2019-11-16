import { StatusEnum } from '../../enums'
import { Exception } from './Exception'

export class TaskNotFoundException extends Exception {
  constructor(
    message = 'Task was not found',
    error = 'Not found',
    statusCode = StatusEnum.NotFound,
  ) {
    super(message, error, statusCode)
  }
}
