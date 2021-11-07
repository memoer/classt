import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StudentSchoolModel {
  @Field(() => Int)
  studentId: number;
  @Field(() => Int)
  schoolId: number;
}
