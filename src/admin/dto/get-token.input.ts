import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class GetAdminTokenInput {
  @Field((type) => String)
  @IsEmail()
  email: string;
  @Field((type) => String)
  password: string;
}
