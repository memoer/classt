import { AuthGuardOf, CurrentUser } from '@app/etc';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AdminAuthService } from '../application/service/admin-auth.service';
import { Admin } from '../domain/entity/admin.entity';
import { AddAdminAuthArgs } from '../dto/add-admin-auth.in';
import { AdminModel } from '../dto/admin.model';
import { DeleteAdminAuthArgs } from '../dto/delete-admin-auth.in';

@Resolver((of) => AdminModel)
@AuthGuardOf('ADMIN')
export class AdminAuthMutationResolver {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Mutation((returns) => AdminModel, { name: 'addAdminAuth' })
  add(@CurrentUser() me: Admin, @Args() { authTypeList }: AddAdminAuthArgs): Promise<AdminModel> {
    return this.adminAuthService.add(me, authTypeList);
  }

  @Mutation((returns) => AdminModel, { name: 'deleteAdminAuth' })
  delete(
    @CurrentUser() me: Admin,
    @Args() { authTypeList }: DeleteAdminAuthArgs,
  ): Promise<AdminModel> {
    return this.adminAuthService.delete(me, authTypeList);
  }
}
