import { ArgsType, Field } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { AdminAuthType } from '../domain/entity/admin-auth.entity';

@ArgsType()
export class DeleteAdminAuthArgs {
  @Field(() => [AdminAuthType])
  @IsEnum(AdminAuthType, { each: true })
  authTypeList: AdminAuthType[];
}
