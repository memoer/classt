import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentService } from './application/student.service';
import { StudentRepository } from './infra/student.repository';
import { StudentMutationResolver } from './resolver/student-mutation.resolver';
import { StudentQueryResolver } from './resolver/student-query.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([StudentRepository])],
  providers: [
    // 표현
    StudentQueryResolver,
    StudentMutationResolver,
    // 응용
    StudentService,
  ],
})
export class StudentModule {}
