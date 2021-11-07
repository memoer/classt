import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateSchoolNewsInput {
  @Field(() => Int)
  @IsNumber()
  schoolId: number;
  @Field(() => String)
  @IsString()
  information: string;
}
