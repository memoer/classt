import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { CreateSchoolInput } from './create-school.in';

@InputType()
export class UpdateSchoolInput extends PartialType(CreateSchoolInput) {
  @Field(() => Int)
  @IsNumber()
  id: number;
}
