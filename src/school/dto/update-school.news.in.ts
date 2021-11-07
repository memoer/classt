import { Field, InputType, Int, PartialType, PickType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { CreateSchoolNewsInput } from './create-school-news.in';

@InputType()
export class UpdateSchoolNewsInput extends PickType(PartialType(CreateSchoolNewsInput), [
  'information',
]) {
  @Field(() => Int)
  @IsNumber()
  id: number;
}
