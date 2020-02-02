import { taskRepository } from '../../repositories';
import { DiscardAllArchivedTasksUseCase } from './DiscardAllArchivedTasksUseCase';

export { DiscardAllArchivedTasksErrors } from './DiscardAllArchivedTasksErrors';
export const discardAllArchivedTasksUseCase = new DiscardAllArchivedTasksUseCase(
  taskRepository,
);
