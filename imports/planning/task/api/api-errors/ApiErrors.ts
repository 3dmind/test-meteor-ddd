import { Meteor } from 'meteor/meteor';
import { ErrorStatus } from './ErrorStatus';

export namespace ApiErrors {
  export class BadRequest extends Meteor.Error {
    constructor(message: string) {
      super(ErrorStatus.BadRequest, 'Bad request', message);
    }
  }

  export class Unauthorized extends Meteor.Error {
    constructor() {
      super(
        ErrorStatus.Unauthorized,
        'Unauthorized',
        'Unauthorized method call',
      );
    }
  }

  export class Forbidden extends Meteor.Error {
    constructor(message) {
      super(ErrorStatus.Forbidden, 'Forbidden', message);
    }
  }

  export class NotFound extends Meteor.Error {
    constructor(message: string) {
      super(ErrorStatus.NotFound, 'Not found', message);
    }
  }

  export class InternalServerError extends Meteor.Error {
    constructor(message) {
      super(ErrorStatus.InternalServerError, ' Internal server error', message);
    }
  }
}
