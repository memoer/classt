import { Field, ObjectType } from '@nestjs/graphql';
import { AdminModel } from './admin.model';

@ObjectType()
export class CreateAdminOutput {
  @Field((type) => AdminModel)
  data: AdminModel;
  @Field((type) => String)
  token: string;
}
