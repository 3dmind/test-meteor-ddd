import { Specification } from './Specification';

export class AnyPassSpecification<Entity> implements Specification<Entity> {
  private specs: Specification<Entity>[];

  constructor(specs: Specification<Entity>[]) {
    this.specs = specs;
  }

  isSatisfiedBy(entity: Entity): boolean {
    return this.specs.some((spec) => spec.isSatisfiedBy(entity));
  }
}
