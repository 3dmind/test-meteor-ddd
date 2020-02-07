import { Result, UseCaseError } from '../../../../core/logic';
import { TaskId, TaskOwnerId } from '../../domain';

export namespace TaskUseCaseErrors {
  export class DoesNotExist extends Result<UseCaseError> {
    constructor(taskId: TaskId) {
      super(false, {
        message: `The task with ID ${taskId.id.value} does not exist.`,
      } as UseCaseError);
    }
  }

  interface WrongOwnerErrorProps {
    taskId: TaskId;
    taskOwnerId: TaskOwnerId;
  }
  export class WrongOwner extends Result<UseCaseError> {
    constructor({ taskId, taskOwnerId }: WrongOwnerErrorProps) {
      super(false, {
        message: `The task with ID ${taskId.id.value} does not belong to owner with ID ${taskOwnerId.id.value}`,
      } as UseCaseError);
    }
  }
}
