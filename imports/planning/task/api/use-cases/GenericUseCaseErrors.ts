import { UniqueEntityId } from '../../../../core/domain';
import { Result, UseCaseError } from '../../../../core/logic';
import { TaskId } from '../../domain';

export namespace GenericUseCaseErrors {
  export class TaskDoesNotExist extends Result<UseCaseError> {
    constructor(taskId: TaskId) {
      super(false, {
        message: `The task with ID ${taskId.id.value} does not exist.`,
      } as UseCaseError);
    }
  }

  interface WrongOwnerErrorProps {
    taskId: TaskId;
    ownerId: UniqueEntityId;
  }
  export class WrongTaskOwner extends Result<UseCaseError> {
    constructor({ taskId, ownerId }: WrongOwnerErrorProps) {
      super(false, {
        message: `The task with ID ${taskId.id.value} does not belong to owner with ID ${ownerId.value}`,
      } as UseCaseError);
    }
  }
}
