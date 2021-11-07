import { Injectable } from '@nestjs/common';
import { School } from '../../domain/entity/school.entity';
import { SchoolRepository } from '../../infra/school.repository';
import { SchoolValidator } from './school.validator';

@Injectable()
export class SchoolHepler {
  constructor(
    private readonly schoolValidator: SchoolValidator,
    private readonly schoolRepository: SchoolRepository,
  ) {}

  async findOneOrFail(id: number): Promise<School> {
    const school = await this.schoolRepository.findOne(id);
    this.schoolValidator.ifNotFoundThrow(school);
    return school;
  }
}
