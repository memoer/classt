import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { School } from '../domain/entity/school.entity';

@EntityRepository(School)
export class SchoolRepository extends BaseRepository<School> {}
