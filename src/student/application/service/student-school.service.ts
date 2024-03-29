import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Student } from '../../domain/entity/student.entity';
import { StudentSchool } from '../../domain/entity/student-school.entity';
import { StudentSchoolModel } from '../../dto/student-school.model';
import { StudentRepository } from '../../infra/student.repository';
import { StudentSchoolMutationResolver } from '../../resolver/student-school-mutation.resolver';
import { StudentSchoolValidator } from '../lib/student-school.validator';

@Injectable()
export class StudentSchoolService {
  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly studentSchoolValidator: StudentSchoolValidator,
  ) {}

  async subscribe(
    student: Student,
    schoolId: number,
  ): ReturnType<StudentSchoolMutationResolver['subscribe']> {
    const newStudentSchool = StudentSchool.createStudentSchool(schoolId);
    const subscribedSchool = student.subscribeSchool(newStudentSchool);
    await this.studentRepository.save(student);
    return plainToClass(StudentSchoolModel, subscribedSchool);
  }

  async unsubscribe(
    student: Student,
    schoolId: number,
  ): ReturnType<StudentSchoolMutationResolver['unsubscribe']> {
    await this.studentSchoolValidator.ifNotSubscribedThrow({ studentId: student.id, schoolId });
    student.unsubscribeSchool(schoolId);
    await this.studentRepository.save(student);
    return true;
  }
}
