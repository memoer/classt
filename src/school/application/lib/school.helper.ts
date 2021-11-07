import { Injectable } from '@nestjs/common';
import { FindOneOptions } from 'typeorm';
import { School } from '../../domain/entity/school.entity';
import { SchoolRepository } from '../../infra/school.repository';
import { SchoolValidator } from './school.validator';

@Injectable()
export class SchoolHelper {
  constructor(
    private readonly schoolValidator: SchoolValidator,
    private readonly schoolRepository: SchoolRepository,
  ) {}

  async findOneOrFail(id: number, opts?: FindOneOptions<School>): Promise<School> {
    const school = await this.schoolRepository.findOne(id, opts);
    this.schoolValidator.ifNotFoundThrow(school);
    return school;
  }
}
