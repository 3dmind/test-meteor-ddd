import { taskRepository } from '../../repositories';
import { NoteTaskUseCase } from './NoteTaskUseCase';

export { NoteTaskDto } from './NoteTaskDto';
export const noteTaskUseCase = new NoteTaskUseCase(taskRepository);
