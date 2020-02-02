import { UniqueEntityId } from '../../../../../core/domain';
import { Result, UseCaseError } from '../../../../../core/logic';

export namespace DiscardAllArchivedTasksErrors {
  export class NoArchivedTasks extends Result<UseCaseError> {
    constructor(ownerId: UniqueEntityId) {
      super(false, {
        message: `The owner with ID ${ownerId.value} has now archived tasks.`,
      } as UseCaseError);
    }
  }
}
