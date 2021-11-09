import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@ArgsType()
export class RestoreSchoolArgs {
  @Field(() => Int)
  @IsNumber()
  id: number;
}
