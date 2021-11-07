import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AdminModel {
  @Field((type) => Int)
  id: number;
  @Field((type) => String)
  email: string;
  @Field((type) => String)
  name: string;
}
