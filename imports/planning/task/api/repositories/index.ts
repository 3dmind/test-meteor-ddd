import { TaskCollection } from '../collections';
import { TaskMapper } from '../mappers';
import { TaskRepository } from './TaskRepository';

export const taskRepository = new TaskRepository(TaskCollection, TaskMapper);
