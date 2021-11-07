import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { AdminAuth, AdminAuthType } from '../../domain/entity/admin-auth.entity';
import { Admin } from '../../domain/entity/admin.entity';
import { AdminAuthModel } from '../../dto/admin-auth.model';
import { AdminRepository } from '../../infra/admin.repository';
import { AdminAuthMutationResolver } from '../../resolver/admin-auth-mutation.resolver';

@Injectable()
export class AdminAuthService {
  constructor(private readonly adminRepository: AdminRepository) {}

  @Transactional()
  async add(
    admin: Admin,
    newAuthTypeList: AdminAuthType[],
  ): ReturnType<AdminAuthMutationResolver['add']> {
    const newAdminAuthList = newAuthTypeList.map((newAuthType) =>
      AdminAuth.createAdminAuth({ type: newAuthType }),
    );
    admin.addAuth(newAdminAuthList);
    await this.adminRepository.save(admin);
    return plainToClass(
      AdminAuthModel,
      newAdminAuthList.filter(({ id }) => !!id),
    );
  }

  @Transactional()
  async delete(
    admin: Admin,
    authTypeToDeleteList: AdminAuthType[],
  ): ReturnType<AdminAuthMutationResolver['delete']> {
    admin.deleteAuth(authTypeToDeleteList);
    await this.adminRepository.save(admin);
    return true;
  }
}
