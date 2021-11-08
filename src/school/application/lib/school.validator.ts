import { UtilCommon } from '@app/util';
import { Injectable } from '@nestjs/common';
import { CreateSchoolInput } from '../../dto/create-school.in';
import { SchoolRepository } from '../../infra/school.repository';

@Injectable()
export class SchoolValidator {
  constructor(
    private readonly schoolRepository: SchoolRepository,
    private readonly utilCommon: UtilCommon,
  ) {}

  async ifAlreadyExistThrow({ location, name }: CreateSchoolInput): Promise<void> {
    const school = await this.schoolRepository.findOne({
      where: { location, name },
      select: ['id'],
    });
    if (!!school) {
      throw this.utilCommon.exception({
        type: 'ConflictException',
        msg: `${location}_${name}/이미 있는 학교입니다.`,
      });
    }
  }
}
