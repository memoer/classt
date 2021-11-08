import { UtilCommon } from '@app/util';
import { Injectable } from '@nestjs/common';
import { Student } from '../../domain/entity/student.entity';

@Injectable()
export class StudentValidator {
  constructor(private readonly utilCommon: UtilCommon) {}

  ifNotDeletedThrow(student: Student): void {
    if (!student.isDeleted()) {
      throw this.utilCommon.exception({
        type: 'BadRequestException',
        msg: `${student.id}/회원탈퇴한 학생이 아닙니다.`,
      });
    }
  }
}
