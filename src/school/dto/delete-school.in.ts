import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@ArgsType()
export class DeleteSchoolArgs {
  @Field(() => Int)
  @IsNumber()
  id: number;
}
