import { UniqueEntityId, UseCase } from '../../../../../core/domain';
import {
  Either,
  eitherLeft,
  eitherRight,
  GenericAppErrors,
  Result,
} from '../../../../../core/logic';
import { TaskId } from '../../../domain';
import { TaskRepository } from '../../repositories/TaskRepository';
import { GenericUseCaseErrors } from '../GenericUseCaseErrors';
import { ResumeTaskDto } from './ResumeTaskDto';

type Request = {
  dto: ResumeTaskDto;
  userId: string;
};

type Response = Either<
  | GenericUseCaseErrors.TaskDoesNotExist
  | GenericUseCaseErrors.WrongTaskOwner
  | GenericAppErrors.UnexpectedError,
  Result<void>
>;

export class ResumeTaskUseCase implements UseCase<Request, Response> {
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

    task.resume();
    try {
      this.taskRepository.save(task);
    } catch (error) {
      return eitherLeft(new GenericAppErrors.UnexpectedError(error));
    }
    return eitherRight(Result.ok<void>());
  }
}
