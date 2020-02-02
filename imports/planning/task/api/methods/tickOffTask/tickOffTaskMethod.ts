import { Meteor } from 'meteor/meteor';
import { GenericAppErrors } from '../../../../../core/logic';
import { ApiErrors } from '../../api-errors';
import {
  GenericUseCaseErrors,
  TickOffTaskDto,
  tickOffTaskUseCase,
} from '../../use-cases';
import { TickOffTaskMethodName } from './TickOffTaskMethodName';

Meteor.methods({
  [TickOffTaskMethodName]: function tickOffTaskMethod(
    dto: TickOffTaskDto,
  ): void {
    const { userId } = this;
    if (!userId) {
      throw new ApiErrors.Unauthorized();
    }

    const response = tickOffTaskUseCase.execute({
      dto,
      userId,
    });
    if (response.isLeft()) {
      const { result } = response;
      if (result instanceof GenericUseCaseErrors.TaskDoesNotExist) {
        throw new ApiErrors.NotFound(result.error.message);
      } else if (result instanceof GenericUseCaseErrors.WrongTaskOwner) {
        throw new ApiErrors.Forbidden(result.error.message);
      } else if (result instanceof GenericAppErrors.UnexpectedError) {
        throw new ApiErrors.InternalServerError(result.error.message);
      }
    }
  },
});
