import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class HelloOuput {
  @Field((type) => String)
  text: string;
  @Field((type) => Date)
  date: Date;
}
