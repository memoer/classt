import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { plainToClass } from 'class-transformer';
import { Admin } from '../domain/entity/admin.entity';
import { AdminAuthModel } from '../dto/admin-auth.model';
import { AdminModel } from '../dto/admin.model';
import { AdminAuthDAO } from '../infra/admin-auth.dao';

@Resolver((of) => AdminModel)
export class AdminTypeResolver {
  constructor(private readonly adminAuthDAO: AdminAuthDAO) {}

  @ResolveField((returns) => [AdminAuthModel])
  async authList(@Parent() admin: Admin): Promise<AdminAuthModel[]> {
    if (Array.isArray(admin.authList)) {
      // 배열이라면 -> 이미 앞에서 Query가 돌아간 것임 [ RoleGuard 에서 ]
      return plainToClass(AdminAuthModel, admin.authList);
    }
    console.log('check');
    // undefined라면 조회해볼 것
    return this.adminAuthDAO.findMany(admin.id);
  }
}
