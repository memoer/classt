import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentService } from './application/student.service';
import { StudentSchoolService } from './application/student-school.service';
import { StudentRepository } from './infra/student.repository';
import { StudentMutationResolver } from './resolver/student-mutation.resolver';
import { StudentQueryResolver } from './resolver/student-query.resolver';
import { StudentSchoolMutationResolver } from './resolver/student-school-mutation.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([StudentRepository])],
  providers: [
    // 표현
    StudentMutationResolver,
    StudentQueryResolver,
    StudentSchoolMutationResolver,
    // 응용
    StudentService,
    StudentSchoolService,
  ],
})
export class StudentModule {}
