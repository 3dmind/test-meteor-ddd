import { Specification } from './Specification';

export class AllPassSpecification<Entity> implements Specification<Entity> {
  private specs: Specification<Entity>[];

  constructor(specs: Specification<Entity>[]) {
    this.specs = specs;
  }

  isSatisfiedBy(entity: Entity): boolean {
    return this.specs.every((spec) => spec.isSatisfiedBy(entity));
  }
}
