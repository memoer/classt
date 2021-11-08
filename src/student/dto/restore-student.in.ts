import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@ArgsType()
export class RestoreStudentArgs {
  @Field((type) => Int)
  @IsNumber()
  id: number;
}
