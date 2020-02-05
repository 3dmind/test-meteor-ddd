import { Specification } from '../../../../core/domain';
import { Task } from '../Task';

export class NotAlreadyDiscarded implements Specification<Task> {
  isSatisfiedBy(entity: Task): boolean {
    return !entity.isDiscarded();
  }
}
