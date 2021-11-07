import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentService } from './application/student.service';
import { SubscribeSchoolService } from './application/subscribe-school.service';
import { StudentRepository } from './infra/student.repository';
import { StudentMutationResolver } from './resolver/student-mutation.resolver';
import { StudentQueryResolver } from './resolver/student-query.resolver';
import { SubscribeSchoolMutationResolver } from './resolver/subscribe-school-mutation.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([StudentRepository])],
  providers: [
    // 표현
    StudentQueryResolver,
    StudentMutationResolver,
    SubscribeSchoolMutationResolver,
    // 응용
    StudentService,
    SubscribeSchoolService,
  ],
})
export class StudentModule {}
