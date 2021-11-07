import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StudentSubscribedSchoolModel {
  @Field(() => Int)
  studentId: number;
  @Field(() => Int)
  schoolId: number;
}
