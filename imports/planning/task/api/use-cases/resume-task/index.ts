import { taskRepository } from '../../repositories';
import { ResumeTaskUseCase } from './ResumeTaskUseCase';

export { ResumeTaskDto } from './ResumeTaskDto';
export const resumeTaskUseCase = new ResumeTaskUseCase(taskRepository);
