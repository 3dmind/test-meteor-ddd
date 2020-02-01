import { Meteor } from 'meteor/meteor';
import { GenericAppErrors } from '../../../../../core/logic';
import { ApiErrors } from '../../api-errors';
import {
  EditTaskDto,
  editTaskUseCase,
  GenericUseCaseErrors,
} from '../../use-cases';
import { EditTaskMethodName } from './EditTaskMethodName';

Meteor.methods({
  [EditTaskMethodName]: function editTaskMethod(dto: EditTaskDto): void {
    const { userId } = this;
    if (!userId) {
      throw new ApiErrors.Unauthorized();
    }

    const response = editTaskUseCase.execute({
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
      } else {
        throw new ApiErrors.BadRequest(result.error);
      }
    }
  },
});
