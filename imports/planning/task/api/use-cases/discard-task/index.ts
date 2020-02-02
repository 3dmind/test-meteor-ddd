import { taskRepository } from '../../repositories';
import { DiscardTaskUseCase } from './DiscardTaskUseCase';

export { DiscardTaskDto } from './DiscardTaskDto';
export const discardTaskUseCase = new DiscardTaskUseCase(taskRepository);
