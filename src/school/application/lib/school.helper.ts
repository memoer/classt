import { UtilValidator } from '@app/util/util-validator';
import { Injectable } from '@nestjs/common';
import { FindOneOptions } from 'typeorm';
import { School } from '../../domain/entity/school.entity';
import { SchoolRepository } from '../../infra/school.repository';

@Injectable()
export class SchoolHelper {
  constructor(
    private readonly utilValidator: UtilValidator,
    private readonly schoolRepository: SchoolRepository,
  ) {}

  async findOneOrFail(id: number, opts?: FindOneOptions<School>): Promise<School> {
    const school = await this.schoolRepository.findOne(id, opts);
    this.utilValidator.ifNotFoundThrow({ entity: school, errorMsg: '없는 학교입니다.' });
    return school;
  }
}
