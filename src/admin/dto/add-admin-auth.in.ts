import { ArgsType, Field } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { AdminAuthType } from '../domain/entity/admin-auth.entity';

@ArgsType()
export class AddAdminAuthArgs {
  @Field(() => [AdminAuthType])
  @IsEnum(AdminAuthType, { each: true })
  authTypeList: AdminAuthType[];
}
