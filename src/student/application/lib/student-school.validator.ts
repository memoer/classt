import { UtilCommon } from '@app/util';
import { Injectable } from '@nestjs/common';
import { StudentSchoolDAO } from '../../infra/student-school.dao';
import { IfNotSubscribedThrow } from '../../dto/student-school-validator.dto';

@Injectable()
export class StudentSchoolValidator {
  constructor(
    private readonly utilCommon: UtilCommon,
    private readonly studentSchoolDAO: StudentSchoolDAO,
  ) {}

  async ifNotSubscribedThrow({ studentId, schoolId }: IfNotSubscribedThrow): Promise<void> {
    const studentSchool = await this.studentSchoolDAO.findOne({ studentId, schoolId });
    if (!studentSchool) {
      throw this.utilCommon.exception({
        type: 'BadRequestException',
        msg: `${schoolId}/해당 학교를 구독하지 않고 있습니다.`,
      });
    }
  }
}
