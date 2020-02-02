import { taskRepository } from '../../repositories';
import { ArchiveTaskUseCase } from './ArchiveTaskUseCase';

export { ArchiveTaskDto } from './ArchiveTaskDto';
export const archiveTaskUseCase = new ArchiveTaskUseCase(taskRepository);
