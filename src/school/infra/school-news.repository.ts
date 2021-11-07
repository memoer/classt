import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { SchoolNews } from '../domain/entity/school-news.entity';

@EntityRepository(SchoolNews)
export class SchoolNewsRepository extends BaseRepository<SchoolNews> {}
