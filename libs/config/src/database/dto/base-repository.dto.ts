import { DeepPartial, FindOneOptions } from 'typeorm';

export class UpsertArgs<Entity> {
  findOneOpts: FindOneOptions<Entity>;
  updateFn: (data: Entity) => void;
  createOpts: DeepPartial<Entity>;
}
