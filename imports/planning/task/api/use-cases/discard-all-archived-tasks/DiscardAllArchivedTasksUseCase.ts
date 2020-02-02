import Ramda from 'ramda';
import { UniqueEntityId, UseCase } from '../../../../../core/domain';
import {
  Either,
  eitherLeft,
  eitherRight,
  GenericAppErrors,
  Result,
} from '../../../../../core/logic';
import { TaskRepository } from '../../repositories/TaskRepository';
import { DiscardAllArchivedTasksErrors } from './DiscardAllArchivedTasksErrors';

type Request = {
  userId: string;
};

type Response = Either<
  | DiscardAllArchivedTasksErrors.NoArchivedTasks
  | GenericAppErrors.UnexpectedError,
  Result<void>
>;

export class DiscardAllArchivedTasksUseCase
  implements UseCase<Request, Response> {
  private readonly taskRepository: TaskRepository;

  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }

  execute(request?: Request): Response {
    const { userId } = request;
    const ownerId = UniqueEntityId.create(userId);
    const tasks = this.taskRepository.findArchivedTasksByOwnerId(ownerId);
    if (Ramda.isEmpty(tasks)) {
      return eitherLeft(
        new DiscardAllArchivedTasksErrors.NoArchivedTasks(ownerId),
      );
    }

    tasks.forEach((task) => task.discard());
    try {
      this.taskRepository.saveAll(tasks);
    } catch (error) {
      return eitherLeft(new GenericAppErrors.UnexpectedError(error));
    }
    return eitherRight(Result.ok<void>());
  }
}
