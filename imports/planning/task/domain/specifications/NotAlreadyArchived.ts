import { Specification } from '../../../../core/domain';
import { Task } from '../Task';

export class NotAlreadyArchived implements Specification<Task> {
  isSatisfiedBy(entity: Task): boolean {
    return !entity.isArchived();
  }
}
