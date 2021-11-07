import { BaseEntity, UpdateEntityArgs } from '@app/config';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { School } from './school.entity';

@Entity()
export class SchoolNews extends BaseEntity {
  @Column()
  information: string;
  @Column({ type: 'bigint' })
  @RelationId((schoolNews: SchoolNews) => schoolNews.school)
  schoolId: number;
  @ManyToOne(() => School, (school) => school.schoolNewsList, { orphanedRowAction: 'delete' })
  @JoinColumn()
  school: School;

  static createSchoolNews({
    information,
  }: UpdateEntityArgs<SchoolNews, 'schoolId' | 'school'>): SchoolNews {
    const newSchoolNewsEntity = new SchoolNews();
    newSchoolNewsEntity.information = information;
    return newSchoolNewsEntity;
  }
}
