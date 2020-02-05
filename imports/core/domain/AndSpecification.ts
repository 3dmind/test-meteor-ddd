import { Specification } from './Specification';
import Ramda from 'ramda';

export class AndSpecification<Entity> implements Specification<Entity> {
  private first: Specification<Entity>;
  private second: Specification<Entity>;

  constructor(first: Specification<Entity>, second: Specification<Entity>) {
    this.first = first;
    this.second = second;
  }

  isSatisfiedBy(entity: Entity): boolean {
    return Ramda.and(
      this.first.isSatisfiedBy(entity),
      this.second.isSatisfiedBy(entity),
    );
  }
}
