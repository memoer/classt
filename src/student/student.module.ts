import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentService } from './application/service/student.service';
import { StudentSchoolService } from './application/service/student-school.service';
import { StudentRepository } from './infra/student.repository';
import { StudentMutationResolver } from './resolver/student-mutation.resolver';
import { StudentQueryResolver } from './resolver/student-query.resolver';
import { StudentSchoolMutationResolver } from './resolver/student-school-mutation.resolver';
import { StudentSchoolDAO } from './infra/student-school.dao';
import { StudentValidator } from './application/lib/student.validator';
import { StudentSchoolValidator } from './application/lib/student-school.validator';

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
    StudentSchoolDAO,
    StudentValidator,
    StudentSchoolValidator,
  ],
  exports: [StudentSchoolDAO],
})
export class StudentModule {}
