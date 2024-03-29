import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class GetTokenInput {
  @Field((type) => String)
  @IsEmail()
  email: string;
  @Field((type) => String)
  @IsString()
  password: string;
  errorMsg: string;
}
