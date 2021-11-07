import { Field, ObjectType } from '@nestjs/graphql';
import { StudentModel } from './student.model';

@ObjectType()
export class CreateStudentOutput {
  @Field((type) => StudentModel)
  data: StudentModel;
  @Field((type) => String)
  token: string;
}
