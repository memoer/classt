import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Student } from '../../domain/entity/student.entity';
import { StudentSchool } from '../../domain/entity/student-school.entity';
import { StudentSchoolModel } from '../../dto/student-school.model';
import { StudentRepository } from '../../infra/student.repository';
import { StudentSchoolMutationResolver } from '../../resolver/student-school-mutation.resolver';

@Injectable()
export class StudentSchoolService {
  constructor(private readonly studentRepository: StudentRepository) {}

  async subscribe(
    user: Student,
    schoolId: number,
  ): ReturnType<StudentSchoolMutationResolver['subscribe']> {
    const newStudentSchool = StudentSchool.createStudentSchool(schoolId);
    const subscribedSchool = user.subscribeSchool(newStudentSchool);
    await this.studentRepository.save(user);
    return plainToClass(StudentSchoolModel, subscribedSchool);
  }

  async unsubscribe(
    user: Student,
    schoolId: number,
  ): ReturnType<StudentSchoolMutationResolver['unsubscribe']> {
    user.unsubscribeSchool(schoolId);
    await this.studentRepository.save(user);
    return true;
  }
}
