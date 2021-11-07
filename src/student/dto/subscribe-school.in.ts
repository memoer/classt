import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@ArgsType()
export class SubscribeSchoolArgs {
  @Field((type) => Int)
  @IsNumber()
  schoolId: number;
}
