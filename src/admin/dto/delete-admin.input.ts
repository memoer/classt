import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class DeleteAdminInput {
  @Field((type) => String)
  @IsString()
  password: string;
}
