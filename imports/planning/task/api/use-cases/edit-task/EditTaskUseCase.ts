import { UniqueEntityId, UseCase } from '../../../../../core/domain';
import {
  Either,
  eitherLeft,
  eitherRight,
  GenericAppErrors,
  Result,
} from '../../../../../core/logic';
import { Description, TaskId } from '../../../domain';
import { TaskRepository } from '../../repositories/TaskRepository';
import { GenericUseCaseErrors } from '../GenericUseCaseErrors';
import { EditTaskDto } from './EditTaskDto';

type Request = {
  dto: EditTaskDto;
  userId: string;
};

type Response = Either<
  | GenericAppErrors.UnexpectedError
  | GenericUseCaseErrors.TaskDoesNotExist
  | GenericUseCaseErrors.WrongTaskOwner
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
      return eitherLeft(new GenericUseCaseErrors.TaskDoesNotExist(taskId));
    }

    const ownerId = UniqueEntityId.create(userId);
    const isOwnedByUser = task.isOwnedByUser(ownerId);
    if (!isOwnedByUser) {
      return eitherLeft(
        new GenericUseCaseErrors.WrongTaskOwner({
          ownerId,
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
