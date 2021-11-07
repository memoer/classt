import { BaseEntity } from '@app/config';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { School } from './school.entity';

@Entity()
export class SchoolNews extends BaseEntity {
  @Column()
  location: string;
  @Column()
  information: string;
  @Column({ type: 'bigint' })
  @RelationId((school: School) => school.schoolNewsList)
  schoolId: number;
  @ManyToOne(() => School, (school) => school.schoolNewsList, { orphanedRowAction: 'nullify' })
  @JoinColumn()
  school: School;
}
