import { BaseRepository as BP } from 'typeorm-transactional-cls-hooked';
import { UpsertArgs } from '../dto/base-repository.dto';

export class MyBaseRepository<Entity> extends BP<Entity> {
  async upsert({ findOneOpts, updateFn, createOpts }: UpsertArgs<Entity>): Promise<Entity> {
    const entity = await this.findOne(findOneOpts);
    if (entity) {
      updateFn(entity);
      return this.save(entity);
    }
    const newEntity = this.create(createOpts);
    return this.save(newEntity);
  }
}
