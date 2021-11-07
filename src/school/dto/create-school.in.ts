import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateSchoolInput {
  @Field(() => String)
  @IsString()
  location: string;
  @Field(() => String)
  @IsString()
  name: string;
}
