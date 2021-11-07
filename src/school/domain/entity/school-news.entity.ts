import { BaseEntity, UpdateEntityArgs } from '@app/config';
import { Notification } from '@app/src/notification/domain/entity/notification.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, RelationId } from 'typeorm';
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
  @OneToMany(() => Notification, (notification) => notification.schoolNews)
  notificationList: Notification[];

  static createSchoolNews({
    information,
  }: UpdateEntityArgs<SchoolNews, 'schoolId' | 'school'>): SchoolNews {
    const newSchoolNewsEntity = new SchoolNews();
    newSchoolNewsEntity.information = information;
    return newSchoolNewsEntity;
  }
}
