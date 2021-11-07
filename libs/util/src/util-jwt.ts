import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { GetTokenInput } from './dto/get-token.in';
import { UtilValidator } from './util-validator';

@Injectable()
export class UtilJwt {
  constructor(private readonly utilValidator: UtilValidator) {}

  sign(userId: number): string {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET);
  }

  verify(token: string): string | jwt.JwtPayload {
    return jwt.verify(token, process.env.JWT_SECRET);
  }

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
    return this.sign(admin.id);
  }
}
