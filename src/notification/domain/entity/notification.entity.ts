import { SchoolNews } from '@app/src/school/domain/entity/school-news.entity';
import { Student } from '@app/src/student/domain/entity/student.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;
  @Column({ type: 'bigint' })
  @RelationId((notification: Notification) => notification.student)
  studentId: number;
  @Column({ type: 'bigint' })
  @RelationId((notification: Notification) => notification.schoolNews)
  schoolNewsId: number;
  @Column({ default: false })
  isReaded: boolean;
  @ManyToOne(() => Student, (student) => student.notificationList)
  @JoinColumn()
  student: Student;
  @ManyToOne(() => SchoolNews, (schoolNews) => schoolNews.notificationList)
  @JoinColumn()
  schoolNews: SchoolNews;
}
