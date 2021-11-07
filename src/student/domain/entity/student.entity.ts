import { BaseEntity } from '@app/config';
import { Notification } from '@app/src/notification/domain/entity/notification.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { StudentSchool } from './student-school.entity';

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
  @OneToMany(() => StudentSchool, (studentSchool) => studentSchool.student, {
    cascade: true,
  })
  schoolList: StudentSchool[];
  @OneToMany(() => Notification, (notification) => notification.student)
  notificationList: Notification[];

  subscribeSchool(newStudentSchool: StudentSchool): StudentSchool {
    const school = this.schoolList.find(
      (school) => Number(school.schoolId) === newStudentSchool.schoolId,
    );
    if (school) {
      school.restore();
      return school;
    }
    this.schoolList = [...this.schoolList, newStudentSchool];
    return newStudentSchool;
  }

  unsubscribeSchool(schoolId: number): void {
    this.schoolList.forEach((school) => {
      if (Number(school.schoolId) === schoolId) {
        school.softDelete();
      }
    });
  }
}
