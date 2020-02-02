import { Result, UseCaseError } from '../../../../../core/logic';
import { TaskOwnerId } from '../../../domain';

export namespace DiscardAllArchivedTasksErrors {
  export class NoArchivedTasks extends Result<UseCaseError> {
    constructor(taskOwnerId: TaskOwnerId) {
      super(false, {
        message: `The owner with ID ${taskOwnerId.id.value} has now archived tasks.`,
      } as UseCaseError);
    }
  }
}
