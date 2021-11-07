import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { GetTokenInput } from './dto/get-token.in';
import { UtilJwt } from './util-jwt';
import { UtilValidator } from './util-validator';

@Injectable()
export class UtilHelper {
  constructor(private readonly utilValidator: UtilValidator, private readonly utilJwt: UtilJwt) {}

  async getToken(
    repository: BaseRepository<{ id: number; password: string }>,
    { email, password }: GetTokenInput,
  ): Promise<string> {
    const admin = await repository.findOne({
      select: ['id', 'password'],
      where: { email },
    });
    this.utilValidator.ifNotFoundThrow(admin);
    await this.utilValidator.ifWrongPasswordThrow({
      plainPassword: password,
      hashPassword: admin.password,
    });
    return this.utilJwt.sign(admin.id);
  }
}
