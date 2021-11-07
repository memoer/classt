import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@ArgsType()
export class DeleteSchoolNewsArgs {
  @Field(() => Int)
  @IsNumber()
  id: number;
}
