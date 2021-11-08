import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class RestoreStudentInput {
  @Field((type) => Int)
  @IsNumber()
  id: number;
  @Field((type) => String)
  @IsString()
  password: string;
}
