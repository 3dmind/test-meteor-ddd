import { Meteor } from 'meteor/meteor'
import { StatusEnum } from '../../enums'

export abstract class Exception extends Meteor.Error {
  protected constructor(
    message: string,
    error: string,
    statusCode: StatusEnum,
  ) {
    super(statusCode, error, message)
  }
}
