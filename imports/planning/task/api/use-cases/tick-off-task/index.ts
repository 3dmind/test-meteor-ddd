import { taskRepository } from '../../repositories';
import { TickOffTaskUseCase } from './TickOffTaskUseCase';

export { TickOffTaskDto } from './TickOffTaskDto';
export const tickOffTaskUseCase = new TickOffTaskUseCase(taskRepository);
