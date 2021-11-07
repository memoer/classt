import { BaseEntity } from '@app/config';
import { Column, Entity, OneToMany } from 'typeorm';
import { SchoolNews } from './school-news.entity';

@Entity()
export class School extends BaseEntity {
  @Column()
  location: string;
  @Column()
  name: string;
  @OneToMany(() => SchoolNews, (schoolNews) => schoolNews.school, { cascade: true })
  schoolNewsList: SchoolNews[];
}
