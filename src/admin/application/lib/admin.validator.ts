import { UtilCommon } from '@app/util';
import { Injectable } from '@nestjs/common';
import { AdminRepository } from '../../infra/admin.repository';

@Injectable()
export class AdminValidator {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly utilCommn: UtilCommon,
  ) {}

  async ifAlreadyExistThrow(email: string): Promise<void> {
    const admin = await this.adminRepository.findOne({ where: { email }, select: ['email'] });
    if (!!admin) {
      throw this.utilCommn.exception({
        type: 'ConflictException',
        msg: `${email}/사용하고 있는 이메일입니다.`,
      });
    }
  }
}
