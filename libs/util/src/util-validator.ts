import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { UtilCommon, UtilHash } from '.';
import {
  DiffTimeArgs,
  IfNotFoundThrowArgs,
  IfWrongPasswordThrowArgs,
} from './dto/util-validator.dto';

@Injectable()
export class UtilValidator {
  constructor(private readonly utilCommon: UtilCommon, private readonly utilHash: UtilHash) {}

  isFutureFromNow({ diff, unit }: DiffTimeArgs): boolean {
    const now = dayjs();
    return dayjs(diff).diff(now, unit) < 0;
  }

  isPastFromNow({ diff, unit }: DiffTimeArgs): boolean {
    const now = dayjs();
    return dayjs(diff).diff(now, unit) > 0;
  }

  async ifWrongPasswordThrow({
    plainPassword,
    hashPassword,
  }: IfWrongPasswordThrowArgs): Promise<void> {
    const isValid = await this.utilHash.isEquals(plainPassword, hashPassword);
    if (!isValid) {
      throw this.utilCommon.exception({
        type: 'ForbiddenException',
        msg: `${plainPassword}/비밀번호가 틀립니다.`,
      });
    }
  }

  ifThereIsPasswordButWithoutConfirmPasswordThrow(confirmPassword?: string): void {
    if (!confirmPassword) {
      throw this.utilCommon.exception({
        type: 'BadRequestException',
        msg: '확인용 비밀번호도 입력해주세요',
      });
    }
  }

  ifNotFoundThrow<T extends { id: number }>({ entity, errorMsg }: IfNotFoundThrowArgs<T>): void {
    if (!entity) {
      throw this.utilCommon.exception({
        type: 'NotFoundException',
        msg: errorMsg,
      });
    }
  }
}
