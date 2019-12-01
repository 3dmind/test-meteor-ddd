import { Meteor } from 'meteor/meteor'
import { Status } from './Status'

export abstract class ApiException extends Meteor.Error {
  protected constructor(message: string, error: string, statusCode: Status) {
    super(statusCode, error, message)
  }
}
