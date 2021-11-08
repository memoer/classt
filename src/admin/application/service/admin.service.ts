import { UtilHash } from '@app/util';
import { GetTokenInput } from '@app/util/dto/get-token.in';
import { UtilJwt } from '@app/util/util-jwt';
import { UtilValidator } from '@app/util/util-validator';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { Admin } from '../../domain/entity/admin.entity';
import { AdminModel } from '../../dto/admin.model';
import { CreateAdminInput } from '../../dto/create-admin.in';
import { DeleteAdminArgs } from '../../dto/delete-admin.in';
import { UpdateAdminInput } from '../../dto/update-admin.in';
import { AdminRepository } from '../../infra/admin.repository';
import { AdminMutationResolver } from '../../resolver/admin-mutation.resolver';
import { AdminValidator } from '../lib/admin.validator';

@Injectable()
export class AdminService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly utilHash: UtilHash,
    private readonly utilValidator: UtilValidator,
    private readonly utilJwt: UtilJwt,
    private readonly adminValidator: AdminValidator,
  ) {}

  @Transactional()
  async create({
    email,
    password,
    name,
  }: CreateAdminInput): ReturnType<AdminMutationResolver['create']> {
    await this.adminValidator.ifAlreadyExistThrow(email);
    const newAdminEntity = this.adminRepository.create({
      email,
      password: await this.utilHash.genHash(password),
      name,
    });
    const newAdmin = await this.adminRepository.save(newAdminEntity);
    return { data: plainToClass(AdminModel, newAdmin), token: this.utilJwt.sign(newAdmin.id) };
  }

  @Transactional()
  async delete(
    admin: Admin,
    plainPassword: DeleteAdminArgs['password'],
  ): ReturnType<AdminMutationResolver['delete']> {
    await this.utilValidator.ifWrongPasswordThrow({
      plainPassword,
      hashPassword: admin.password,
    });
    const result = await this.adminRepository.softDelete(admin.id);
    return result.affected === 1;
  }

  @Transactional()
  async update(
    admin: Admin,
    { email, password, confirmPassword, name }: UpdateAdminInput,
  ): ReturnType<AdminMutationResolver['update']> {
    if (email) {
      await this.adminValidator.ifAlreadyExistThrow(email);
    }
    if (password) {
      this.utilValidator.ifThereIsPasswordButWithoutConfirmPasswordThrow(confirmPassword);
      admin.password = await this.utilHash.genHash(password);
    }
    admin.update({ email, name });
    await this.adminRepository.save(admin);
    return plainToClass(AdminModel, admin);
  }

  async getToken({ email, password }: GetTokenInput): ReturnType<UtilJwt['getToken']> {
    return this.utilJwt.getToken(this.adminRepository, { email, password });
  }

  @Transactional()
  async restore(id: number): ReturnType<AdminMutationResolver['restore']> {
    const result = await this.adminRepository.restore(id);
    return result.affected === 1;
  }
}
