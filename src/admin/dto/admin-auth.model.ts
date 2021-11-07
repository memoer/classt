import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { AdminAuthType } from '../domain/entity/admin-auth.entity';

registerEnumType(AdminAuthType, { name: 'AdminAuthType' });

@ObjectType()
export class AdminAuthModel {
  @Field((type) => Int)
  id: number;
  @Field((type) => AdminAuthType)
  type: AdminAuthType;
}
