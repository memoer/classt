import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SchoolModel {
  @Field((type) => Int)
  id: number;
  @Field((type) => String)
  location: string;
  @Field((type) => String)
  name: string;
}
