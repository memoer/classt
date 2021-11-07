import { ArgsType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ArgsType()
export class DeleteStudentArgs {
  @Field((type) => String)
  @IsString()
  password: string;
}
