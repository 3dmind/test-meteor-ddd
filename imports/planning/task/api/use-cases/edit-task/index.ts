import { taskRepository } from '../../repositories';
import { EditTaskUseCase } from './EditTaskUseCase';

export { EditTaskDto } from './EditTaskDto';
export const editTaskUseCase = new EditTaskUseCase(taskRepository);
