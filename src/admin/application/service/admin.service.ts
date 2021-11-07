import { UtilHash } from '@app/util';
import { UtilJwt } from '@app/util/util-jwt';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { Admin } from '../../domain/entity/admin.entity';
import { AdminModel } from '../../dto/admin.model';
import { CreateAdminInput } from '../../dto/create-admin.input';
import { DeleteAdminInput } from '../../dto/delete-admin.input';
import { GetAdminTokenInput } from '../../dto/get-token.input';
import { UpdateAdminInput } from '../../dto/update-admin.input';
import { AdminRepository } from '../../infra/admin.repository';
import { AdminMutationResolver } from '../../resolver/admin-mutation.resolver';
import { AdminQueryResolver } from '../../resolver/admin-query.resolver';
import { AdminValidator } from '../lib/admin.validator';

@Injectable()
export class AdminService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly utilHash: UtilHash,
    private readonly adminValidator: AdminValidator,
    private readonly utilJwt: UtilJwt,
  ) {}

  @Transactional()
  async create(input: CreateAdminInput): ReturnType<AdminMutationResolver['create']> {
    const newAdminEntity = this.adminRepository.create({
      ...input,
      password: await this.utilHash.genHash(input.password),
    });
    const newAdmin = await this.adminRepository.save(newAdminEntity);
    return { data: plainToClass(AdminModel, newAdmin), token: this.utilJwt.sign(newAdmin.id) };
  }

  @Transactional()
  async delete(admin: Admin, input: DeleteAdminInput): ReturnType<AdminMutationResolver['delete']> {
    await this.adminValidator.ifWrongPasswordThrow({
      plainPassword: input.password,
      hashPassword: admin.password,
    });
    const result = await this.adminRepository.softDelete(admin.id);
    return result.affected === 1;
  }

  @Transactional()
  async update(
    admin: Admin,
    { password, confirmPassword, ...rest }: UpdateAdminInput,
  ): ReturnType<AdminMutationResolver['update']> {
    if (password) {
      this.adminValidator.ifThereIsPasswordButWithoutConfirmPasswordThrow(confirmPassword);
      admin.password = await this.utilHash.genHash(password);
    }
    admin.update(rest);
    return this.adminRepository.save(admin);
  }

  async getToken({
    email,
    password,
  }: GetAdminTokenInput): ReturnType<AdminQueryResolver['getToken']> {
    const admin = await this.adminRepository.findOne({ email });
    this.adminValidator.ifNotFoundThrow(admin);
    await this.adminValidator.ifWrongPasswordThrow({
      plainPassword: password,
      hashPassword: admin.password,
    });
    return this.utilJwt.sign(admin.id);
  }
}
