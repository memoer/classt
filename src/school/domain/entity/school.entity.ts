import { BaseEntity } from '@app/config';
import { StudentSchool } from '@app/src/student/domain/entity/student-school.entity';
import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { SchoolNews } from './school-news.entity';

@Entity()
@Unique(['location', 'name'])
export class School extends BaseEntity {
  @Column()
  location: string;
  @Column()
  name: string;
  @OneToMany(() => SchoolNews, (schoolNews) => schoolNews.school, { cascade: true })
  schoolNewsList: SchoolNews[];
  @OneToMany(() => StudentSchool, (studentSchool) => studentSchool.school)
  studentList: StudentSchool[];

  addNews(newSchoolNews: SchoolNews): void {
    this.schoolNewsList = [...this.schoolNewsList, newSchoolNews];
  }
}
