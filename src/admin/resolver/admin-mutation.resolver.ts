import { AuthGuardOf, CurrentUser } from '@app/etc';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AdminService } from '../application/service/admin.service';
import { Admin } from '../domain/entity/admin.entity';
import { AdminModel } from '../dto/admin.model';
import { CreateAdminInput } from '../dto/create-admin.in';
import { CreateAdminOutput } from '../dto/create-admin.out';
import { DeleteAdminInput } from '../dto/delete-admin.in';
import { UpdateAdminInput } from '../dto/update-admin.in';

@Resolver((of) => AdminModel)
export class AdminMutationResolver {
  constructor(private readonly adminService: AdminService) {}

  @Mutation((returns) => CreateAdminOutput, { name: 'createAdmin' })
  create(@Args('input') input: CreateAdminInput): Promise<CreateAdminOutput> {
    return this.adminService.create(input);
  }

  @Mutation((returns) => Boolean, { name: 'deleteAdmin' })
  @AuthGuardOf('ADMIN')
  delete(@CurrentUser() me: Admin, @Args('input') input: DeleteAdminInput): Promise<boolean> {
    return this.adminService.delete(me, input);
  }

  @Mutation((returns) => AdminModel, { name: 'updateAdmin' })
  @AuthGuardOf('ADMIN')
  update(@CurrentUser() me: Admin, @Args('input') input: UpdateAdminInput): Promise<AdminModel> {
    return this.adminService.update(me, input);
  }
}
