import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { CreateSchoolInput } from '../../dto/create-school.in';
import { DeleteSchoolArgs } from '../../dto/delete-school.in';
import { SchoolModel } from '../../dto/school.model';
import { UpdateSchoolInput } from '../../dto/update-school.in';
import { SchoolRepository } from '../../infra/school.repository';
import { SchoolMutationResolver } from '../../resolver/school-mutation.resolver';
import { SchoolHepler } from '../lib/school.helper';
import { SchoolValidator } from '../lib/school.validator';

@Injectable()
export class SchoolService {
  constructor(
    private readonly schoolRepository: SchoolRepository,
    private readonly schoolValidator: SchoolValidator,
    private readonly schoolHelper: SchoolHepler,
  ) {}

  @Transactional()
  async create(input: CreateSchoolInput): ReturnType<SchoolMutationResolver['create']> {
    const newSchoolEntity = this.schoolRepository.create(input);
    const newSchool = await this.schoolRepository.save(newSchoolEntity);
    return plainToClass(SchoolModel, newSchool);
  }

  @Transactional()
  async delete(id: DeleteSchoolArgs['id']): ReturnType<SchoolMutationResolver['delete']> {
    const school = await this.schoolRepository.findOne(id);
    this.schoolValidator.ifNotFoundThrow(school);
    const result = await this.schoolRepository.softDelete(id);
    return result.affected === 1;
  }

  @Transactional()
  async update({ id, ...rest }: UpdateSchoolInput): ReturnType<SchoolMutationResolver['update']> {
    const school = await this.schoolHelper.findOneOrFail(id);
    school.update(rest);
    await this.schoolRepository.save(school);
    return plainToClass(SchoolModel, school);
  }
}
