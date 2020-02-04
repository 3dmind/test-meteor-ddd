import { AndSpecification } from '../../../../core/domain';
import { Task } from '../Task';
import { NotAlreadyArchived } from './NotAlreadyArchived';
import { NotAlreadyDiscarded } from './NotAlreadyDiscarded';

export class NotArchivedAndNoArchivingAfterDiscarded extends AndSpecification<
  Task
> {
  constructor() {
    super(new NotAlreadyArchived(), new NotAlreadyDiscarded());
  }
}
