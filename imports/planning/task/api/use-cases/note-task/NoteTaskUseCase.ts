import { UniqueEntityId, UseCase } from '../../../../../core/domain';
import {
  Either,
  eitherLeft,
  eitherRight,
  GenericAppErrors,
  Result,
} from '../../../../../core/logic';
import { Description, Task } from '../../../domain';
import { TaskRepository } from '../../repositories/TaskRepository';
import { NoteTaskDto } from './NoteTaskDto';

type Request = {
  dto: NoteTaskDto;
  userId: string;
};

type Response = Either<
  GenericAppErrors.UnexpectedError | Result<string>,
  Result<Task>
>;

export class NoteTaskUseCase implements UseCase<Request, Response> {
  private readonly taskRepository: TaskRepository;

  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }

  execute(request: Request): Response {
    const { dto, userId } = request;
    const descriptionOrError = Description.create(dto.text);
    if (descriptionOrError.isFailure) {
      return eitherLeft(Result.fail<string>(descriptionOrError.error));
    }

    const task = Task.note(
      descriptionOrError.value,
      UniqueEntityId.create(userId),
    );
    try {
      this.taskRepository.save(task);
    } catch (error) {
      return eitherLeft(new GenericAppErrors.UnexpectedError(error));
    }
    return eitherRight(Result.ok(task));
  }
}
