import { Module } from '@nestjs/common';
import { StudentService } from './application/student.service';
import { StudentMutationResolver } from './resolver/student-mutation.resolver';

@Module({
  providers: [
    // 표현
    StudentMutationResolver,
    // 응용
    StudentService,
  ],
})
export class StudentModule {}
