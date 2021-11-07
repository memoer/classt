import { ArgsType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ArgsType()
export class DeleteAdminArgs {
  @Field((type) => String)
  @IsString()
  password: string;
}
