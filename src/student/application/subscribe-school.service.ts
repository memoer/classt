import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Student } from '../domain/entity/student.entity';
import { StudentSubscribedSchool } from '../domain/entity/subscribe-student-school.entity';
import { StudentSubscribedSchoolModel } from '../dto/student-subscribed-school.model';
import { StudentRepository } from '../infra/student.repository';
import { SubscribeSchoolMutationResolver } from '../resolver/subscribe-school-mutation.resolver';

@Injectable()
export class SubscribeSchoolService {
  constructor(private readonly studentRepository: StudentRepository) {}

  async subscribe(
    user: Student,
    schoolId: number,
  ): ReturnType<SubscribeSchoolMutationResolver['subscribe']> {
    const newStudentSubscribedSchool =
      StudentSubscribedSchool.createStudentSubscribedSchool(schoolId);
    user.subscribeSchool(newStudentSubscribedSchool);
    await this.studentRepository.save(user);
    return plainToClass(StudentSubscribedSchoolModel, newStudentSubscribedSchool);
  }

  async unsubscribe(
    user: Student,
    schoolId: number,
  ): ReturnType<SubscribeSchoolMutationResolver['unsubscribe']> {
    user.unsubscribeSchool(schoolId);
    this.studentRepository.save(user);
    return true;
  }
}
