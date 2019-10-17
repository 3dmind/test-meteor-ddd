/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'meteor/meteor' {
  namespace Meteor {
    const server: {
      method_handlers: {}
    }

    function call<DTO>(
      name: string,
      dto: DTO,
      callback?: (
        error: Error | Meteor.Error | undefined,
        result?: any,
      ) => void,
    ): any
  }
}
