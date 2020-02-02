import { Meteor } from 'meteor/meteor';
import { GenericAppErrors } from '../../../../../core/logic';
import { ApiErrors } from '../../api-errors';
import {
  DiscardAllArchivedTasksErrors,
  discardAllArchivedTasksUseCase,
} from '../../use-cases';
import { DiscardAllArchivedTasksMethodName } from './DiscardAllArchivedTasksMethodName';

Meteor.methods({
  [DiscardAllArchivedTasksMethodName]: function discardAllArchivedTasksMethod(): void {
    const { userId } = this;
    if (!userId) {
      throw new ApiErrors.Unauthorized();
    }

    const response = discardAllArchivedTasksUseCase.execute({
      userId,
    });
    if (response.isLeft()) {
      const { result } = response;
      if (result instanceof DiscardAllArchivedTasksErrors.NoArchivedTasks) {
        throw new ApiErrors.NotFound(result.error.message);
      } else if (result instanceof GenericAppErrors.UnexpectedError) {
        throw new ApiErrors.InternalServerError(result.error.message);
      }
    }
  },
});
