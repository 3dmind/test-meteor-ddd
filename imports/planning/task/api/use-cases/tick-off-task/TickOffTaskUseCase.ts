import { UniqueEntityId, UseCase } from '../../../../../core/domain';
import {
  Either,
  eitherLeft,
  eitherRight,
  GenericAppErrors,
  Result,
} from '../../../../../core/logic';
import { TaskId, TaskOwnerId } from '../../../domain';
import { TaskRepository } from '../../repositories/TaskRepository';
import { TaskUseCaseErrors } from '../TaskUseCaseErrors';
import { TickOffTaskDto } from './TickOffTaskDto';

type Request = {
  dto: TickOffTaskDto;
  userId: string;
};

type Response = Either<
  | TaskUseCaseErrors.DoesNotExist
  | TaskUseCaseErrors.WrongOwner
  | GenericAppErrors.UnexpectedError,
  Result<void>
>;

export class TickOffTaskUseCase implements UseCase<Request, Response> {
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

    task.tickOff();
    try {
      this.taskRepository.save(task);
    } catch (error) {
      return eitherLeft(new GenericAppErrors.UnexpectedError(error));
    }
    return eitherRight(Result.ok<void>());
  }
}
