import { Resolver } from '@nestjs/graphql';
import { StudentService } from '../application/student.service';

@Resolver()
export class StudentMutationResolver {
  constructor(private readonly studentService: StudentService) {}
}
