import { AuthGuardOf, CurrentUser } from '@app/etc';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AdminAuthService } from '../application/service/admin-auth.service';
import { Admin } from '../domain/entity/admin.entity';
import { AddAdminAuthArgs } from '../dto/add-admin-auth.in';
import { AdminAuthModel } from '../dto/admin-auth.model';
import { DeleteAdminAuthArgs } from '../dto/delete-admin-auth.in';

@Resolver((of) => AdminAuthModel)
@AuthGuardOf('ADMIN')
export class AdminAuthMutationResolver {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Mutation((returns) => [AdminAuthModel], { name: 'addAdminAuth' })
  add(
    @CurrentUser() me: Admin,
    @Args() { authTypeList }: AddAdminAuthArgs,
  ): Promise<AdminAuthModel[]> {
    return this.adminAuthService.add(me, authTypeList);
  }

  @Mutation((returns) => Boolean, { name: 'deleteAdminAuth' })
  delete(
    @CurrentUser() me: Admin,
    @Args() { authTypeList }: DeleteAdminAuthArgs,
  ): Promise<boolean> {
    return this.adminAuthService.delete(me, authTypeList);
  }
}
