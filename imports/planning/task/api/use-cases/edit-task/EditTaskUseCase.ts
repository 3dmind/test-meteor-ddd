import { UniqueEntityId, UseCase } from '../../../../../core/domain';
import {
  Either,
  eitherLeft,
  eitherRight,
  GenericAppErrors,
  Result,
} from '../../../../../core/logic';
import { Description, TaskId, TaskOwnerId } from '../../../domain';
import { TaskRepository } from '../../repositories/TaskRepository';
import { TaskUseCaseErrors } from '../TaskUseCaseErrors';
import { EditTaskDto } from './EditTaskDto';

type Request = {
  dto: EditTaskDto;
  userId: string;
};

type Response = Either<
  | GenericAppErrors.UnexpectedError
  | TaskUseCaseErrors.DoesNotExist
  | TaskUseCaseErrors.WrongOwner
  | Result<string>,
  Result<void>
>;

export class EditTaskUseCase implements UseCase<Request, Response> {
  private readonly taskRepository: TaskRepository;

  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }

  execute(request?: Request): Response {
    const { dto, userId } = request;
    const taskId = TaskId.create(UniqueEntityId.create(dto.taskId));
    const { found, task } = this.taskRepository.findByTaskId(taskId);
    if (!found) {
      return eitherLeft(new TaskUseCaseErrors.DoesNotExist(taskId));
    }

    const taskOwnerId = TaskOwnerId.create(UniqueEntityId.create(userId));
    const isOwnedByUser = task.belongsToOwner(taskOwnerId);
    if (!isOwnedByUser) {
      return eitherLeft(
        new TaskUseCaseErrors.WrongOwner({
          taskOwnerId,
          taskId,
        }),
      );
    }

    const descriptionOrError = Description.create(dto.newText);
    if (descriptionOrError.isFailure) {
      return eitherLeft(Result.fail<string>(descriptionOrError.error));
    }
    task.edit(descriptionOrError.value);
    try {
      this.taskRepository.save(task);
    } catch (error) {
      return eitherLeft(new GenericAppErrors.UnexpectedError(error));
    }
    return eitherRight(Result.ok<void>());
  }
}
