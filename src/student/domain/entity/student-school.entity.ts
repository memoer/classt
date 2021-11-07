import { School } from '@app/src/school/domain/entity/school.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  RelationId,
} from 'typeorm';
import { Student } from './student.entity';

// ? ManyToMany 연관관계 안 맺고 따로 뺀 이유
// ORM 에서 ManyToMany 로 맺어버리면 중간 테이블을 매핑해주는 클래스가 없다.
// 만약 향후 서비스에서 중간 테이블에 필요한 데이터를 넣어야 할 때, 코드를 많이 변경해야 하므로 빠로 빼서 진행했습니다.
@Entity()
export class StudentSchool {
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;
  @DeleteDateColumn({ type: 'timestamp with time zone', nullable: true })
  deletedAt?: Date;
  @Column({ type: 'bigint' })
  @Index()
  @PrimaryColumn()
  @RelationId((studentSchool: StudentSchool) => studentSchool.student)
  studentId: number;
  @Column({ type: 'bigint' })
  @Index()
  @PrimaryColumn()
  schoolId: number;
  @ManyToOne(() => Student, (student) => student.schoolList)
  @JoinColumn()
  student: Student;
  @ManyToOne(() => School, (school) => school.studentList)
  @JoinColumn()
  school: School;

  static createStudentSchool(schoolId: number): StudentSchool {
    const newStudentSchoolEntity = new StudentSchool();
    newStudentSchoolEntity.schoolId = schoolId;
    return newStudentSchoolEntity;
  }
  softDelete(): void {
    this.deletedAt = new Date();
  }
  restore(): void {
    this.deletedAt = null;
  }
}
