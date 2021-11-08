import { AuthGuardOf, CurrentUser } from '@app/etc';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { StudentService } from '../application/student.service';
import { Student } from '../domain/entity/student.entity';
import { CreateStudentInput } from '../dto/create-student.in';
import { CreateStudentOutput } from '../dto/create-student.out';
import { DeleteStudentArgs } from '../dto/delete-student.in';
import { RestoreStudentArgs } from '../dto/restore-student.in';
import { StudentModel } from '../dto/student.model';
import { UpdateStudentInput } from '../dto/update-student.in';

@Resolver((of) => StudentModel)
export class StudentMutationResolver {
  constructor(private readonly studentService: StudentService) {}

  @Mutation((returns) => CreateStudentOutput, { name: 'createStudent' })
  create(@Args('input') input: CreateStudentInput): Promise<CreateStudentOutput> {
    return this.studentService.create(input);
  }

  @Mutation((returns) => Boolean, { name: 'deleteStudent' })
  @AuthGuardOf('STUDENT')
  delete(@CurrentUser() me: Student, @Args() { password }: DeleteStudentArgs): Promise<boolean> {
    return this.studentService.delete(me, password);
  }

  @Mutation((returns) => StudentModel, { name: 'updateStudent' })
  @AuthGuardOf('STUDENT')
  update(
    @CurrentUser() me: Student,
    @Args('input') input: UpdateStudentInput,
  ): Promise<StudentModel> {
    return this.studentService.update(me, input);
  }

  @Mutation((returns) => Boolean, { name: 'restoreStudent' })
  restore(@Args() { id }: RestoreStudentArgs): Promise<boolean> {
    return this.studentService.restore(id);
  }
}
