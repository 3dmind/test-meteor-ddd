export interface Repository<T> {
  exists(entity: T): boolean;
  save(entity: T): T;
}
