import { Meteor } from 'meteor/meteor';
import { GenericAppErrors } from '../../../../../core/logic';
import { ApiErrors } from '../../api-errors';
import {
  DiscardTaskDto,
  discardTaskUseCase,
  GenericUseCaseErrors,
} from '../../use-cases';
import { DiscardTaskMethodName } from './DiscardTaskMethodName';

Meteor.methods({
  [DiscardTaskMethodName]: function discardTaskMethod(
    dto: DiscardTaskDto,
  ): void {
    const { userId } = this;
    if (!userId) {
      throw new ApiErrors.Unauthorized();
    }

    const response = discardTaskUseCase.execute({
      dto,
      userId,
    });
    if (response.isLeft()) {
      const { result } = response;
      if (result instanceof GenericUseCaseErrors.TaskDoesNotExist) {
        throw new ApiErrors.NotFound(result.error.message);
      } else if (result instanceof GenericUseCaseErrors.WrongTaskOwner) {
        throw new ApiErrors.BadRequest(result.error.message);
      } else if (result instanceof GenericAppErrors.UnexpectedError) {
        throw new ApiErrors.InternalServerError(result.error.message);
      }
    }
  },
});
