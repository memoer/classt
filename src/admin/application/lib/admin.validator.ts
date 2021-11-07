import { UtilCommon, UtilHash } from '@app/util';
import { Injectable } from '@nestjs/common';
import { Admin } from '../../domain/entity/admin.entity';
import { IfWrongPasswordThrowArgs } from '../../dto/admin-validator.dto';

@Injectable()
export class AdminValidator {
  constructor(private readonly utilCommon: UtilCommon, private readonly utilHash: UtilHash) {}

  ifNotFoundThrow(entity: Admin): void {
    if (!entity) {
      this.utilCommon.throwException({
        type: 'NotFoundException',
        msg: `${entity.id}/없는 관리자 입니다.`,
      });
    }
  }

  async ifWrongPasswordThrow({
    plainPassword,
    hashPassword,
  }: IfWrongPasswordThrowArgs): Promise<void> {
    const isValid = await this.utilHash.isEquals(plainPassword, hashPassword);
    if (!isValid) {
      this.utilCommon.throwException({
        type: 'ForbiddenException',
        msg: `${plainPassword}/비밀번호가 틀립니다.`,
      });
    }
  }

  ifThereIsPasswordButWithoutConfirmPasswordThrow(confirmPassword?: string): void {
    if (!confirmPassword)
      this.utilCommon.throwException({
        type: 'BadRequestException',
        msg: '확인용 비밀번호도 입력해주세요',
      });
  }
}
