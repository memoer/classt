import { AuthGuardOf, CurrentUser } from '@app/etc';
import { GetTokenInput } from '@app/util/dto/get-token.in';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { plainToClass } from 'class-transformer';
import { StudentService } from '../application/student.service';
import { Student } from '../domain/entity/student.entity';
import { StudentModel } from '../dto/student.model';

@Resolver((of) => StudentModel)
export class StudentQueryResolver {
  constructor(private readonly studentService: StudentService) {}

  @Query((returns) => String, { name: 'getStudentToken' })
  getToken(@Args('input') input: GetTokenInput): Promise<string> {
    return this.studentService.getToken(input);
  }

  @Query((returns) => StudentModel, { name: 'getMyStudentInfo' })
  @AuthGuardOf('STUDENT')
  getMyInfo(@CurrentUser() me: Student): StudentModel {
    return plainToClass(StudentModel, me);
  }
}
