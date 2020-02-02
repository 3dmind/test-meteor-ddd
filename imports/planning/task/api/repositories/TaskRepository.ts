import { Repository } from '../../../../core/infrastructure';
import { Task, TaskId, TaskOwnerId } from '../../domain';
import { TaskCollection, TaskDocument } from '../collections';
import { TaskMapper } from '../mappers';

export class TaskRepository implements Repository<Task> {
  private readonly taskCollection: typeof TaskCollection;
  private readonly taskMapper: typeof TaskMapper;

  constructor(taskCollection, taskMapper) {
    this.taskCollection = taskCollection;
    this.taskMapper = taskMapper;
  }

  exists(task: Task): boolean {
    const taskDocument = this.taskCollection.findOne(task.id.value);
    return !!taskDocument === true;
  }

  save(task: Task): Task {
    const exists = this.exists(task);
    if (exists) {
      this.taskCollection.update(task.id.value, {
        $set: { ...this.taskMapper.toPersistence(task) },
      });
    } else {
      this.taskCollection.insert(this.taskMapper.toPersistence(task));
    }
    return task;
  }

  saveAll(tasks: Task[]): void {
    tasks.forEach((task) => this.save(task));
  }

  findByTaskId(taskId: TaskId): { found: boolean; task?: Task } {
    const taskDocument = this.taskCollection.findOne(taskId.id.value);
    const found = !!taskDocument === true;
    if (!found) {
      return { found };
    }
    return {
      found,
      task: this.taskMapper.toDomain(taskDocument),
    };
  }

  findArchivedTasksByTaskOwnerId(taskOwnerId: TaskOwnerId): Task[] {
    const selector: Mongo.Selector<TaskDocument> = {
      ownerId: taskOwnerId.id.value,
      isArchived: true,
      isDiscarded: false,
    };
    const taskDocuments = this.taskCollection.find(selector).fetch();
    return taskDocuments.map((taskDocument) =>
      this.taskMapper.toDomain(taskDocument),
    );
  }
}
