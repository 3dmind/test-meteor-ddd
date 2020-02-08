import { Meteor } from 'meteor/meteor';
import { GenericAppErrors } from '../../../../../core/logic';
import { ApiErrors } from '../../api-errors';
import {
  TaskUseCaseErrors,
  ResumeTaskDto,
  resumeTaskUseCase,
} from '../../use-cases';
import { ResumeTaskMethodName } from './ResumeTaskMethodName';

Meteor.methods({
  [ResumeTaskMethodName]: function resumeTaskMethod(dto: ResumeTaskDto): void {
    const { userId } = this;
    if (!userId) {
      throw new ApiErrors.Unauthorized();
    }

    const response = resumeTaskUseCase.execute({
      dto,
      userId,
    });
    if (response.isLeft()) {
      const { result } = response;
      if (result instanceof TaskUseCaseErrors.DoesNotExist) {
        throw new ApiErrors.NotFound(result.error.message);
      } else if (result instanceof TaskUseCaseErrors.WrongOwner) {
        throw new ApiErrors.Forbidden(result.error.message);
      } else if (result instanceof GenericAppErrors.UnexpectedError) {
        throw new ApiErrors.InternalServerError(result.error.message);
      }
    }
  },
});
