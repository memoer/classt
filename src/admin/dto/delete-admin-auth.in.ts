import { ArgsType, Field, Int } from '@nestjs/graphql';
import { AdminAuthType } from '../domain/entity/admin-auth.entity';

@ArgsType()
export class DeleteAdminAuthArgs {
  @Field(() => [AdminAuthType])
  authTypeList: AdminAuthType[];
}
