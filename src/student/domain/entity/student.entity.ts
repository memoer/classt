import { BaseEntity } from '@app/config';
import { Column, Entity, OneToMany } from 'typeorm';
import { StudentSubscribedSchool } from './subscribe-student-school.entity';

export enum Gender {
  FEMALE = 'female',
  MALE = 'male',
}
@Entity()
export class Student extends BaseEntity {
  @Column()
  name: string;
  @Column({ type: 'enum', enum: Gender })
  gender: Gender;
  @Column({ type: 'timestamp with time zone' })
  birthDate: Date;
  @Column()
  email: string;
  @Column()
  password: string;
  @OneToMany(
    () => StudentSubscribedSchool,
    (studentSubscribedSchool) => studentSubscribedSchool.student,
    { cascade: true },
  )
  subscribedSchoolList: StudentSubscribedSchool[];

  subscribeSchool(newStudentSubscribedSchool: StudentSubscribedSchool): void {
    this.subscribedSchoolList = [...this.subscribedSchoolList, newStudentSubscribedSchool];
  }

  unsubscribeSchool(schoolId: number): void {
    this.subscribedSchoolList = this.subscribedSchoolList.filter(
      (subscribedSchool) => subscribedSchool.schoolId !== schoolId,
    );
  }
}
