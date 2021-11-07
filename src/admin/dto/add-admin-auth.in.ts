import { ArgsType, Field } from '@nestjs/graphql';
import { AdminAuthType } from '../domain/entity/admin-auth.entity';

@ArgsType()
export class AddAdminAuthArgs {
  @Field(() => [AdminAuthType])
  authTypeList: AdminAuthType[];
}
