import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SchoolNewsModel {
  @Field((type) => Int)
  id: number;
  @Field((type) => String)
  information: string;
}
