import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { AdminAuthType } from '../../domain/entity/admin-auth.entity';
import { Admin } from '../../domain/entity/admin.entity';
import { AdminModel } from '../../dto/admin.model';
import { AdminRepository } from '../../infra/admin.repository';
import { AdminAuthMutationResolver } from '../../resolver/admin-auth-mutation.resolver';

@Injectable()
export class AdminAuthService {
  constructor(private readonly adminRepository: AdminRepository) {}

  @Transactional()
  async add(
    admin: Admin,
    authTypeList: AdminAuthType[],
  ): ReturnType<AdminAuthMutationResolver['add']> {
    admin.addAuth(authTypeList);
    await this.adminRepository.save(admin);
    return plainToClass(AdminModel, admin);
  }

  @Transactional()
  async delete(
    admin: Admin,
    authTypeList: AdminAuthType[],
  ): ReturnType<AdminAuthMutationResolver['delete']> {
    admin.deleteAuth(authTypeList);
    await this.adminRepository.save(admin);
    return plainToClass(AdminModel, admin);
  }
}
