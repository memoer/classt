import { UtilValidator } from '@app/util/util-validator';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { CreateSchoolInput } from '../../dto/create-school.in';
import { DeleteSchoolArgs } from '../../dto/delete-school.in';
import { SchoolModel } from '../../dto/school.model';
import { UpdateSchoolInput } from '../../dto/update-school.in';
import { SchoolRepository } from '../../infra/school.repository';
import { SchoolMutationResolver } from '../../resolver/school-mutation.resolver';
import { SchoolHelper } from '../lib/school.helper';
import { SchoolValidator } from '../lib/school.validator';

@Injectable()
export class SchoolService {
  constructor(
    private readonly schoolRepository: SchoolRepository,
    private readonly schoolHelper: SchoolHelper,
    private readonly utilValidator: UtilValidator,
    private readonly schoolValidator: SchoolValidator,
  ) {}

  @Transactional()
  async create(args: CreateSchoolInput): ReturnType<SchoolMutationResolver['create']> {
    await this.schoolValidator.ifAlreadyExistThrow(args);
    const newSchoolEntity = this.schoolRepository.create(args);
    const newSchool = await this.schoolRepository.save(newSchoolEntity);
    return plainToClass(SchoolModel, newSchool);
  }

  @Transactional()
  async delete(id: DeleteSchoolArgs['id']): ReturnType<SchoolMutationResolver['delete']> {
    const school = await this.schoolRepository.findOne(id, { select: ['id'] });
    this.utilValidator.ifNotFoundThrow({ entity: school, errorMsg: '없는 학교입니다.' });
    const result = await this.schoolRepository.softDelete(id);
    return result.affected === 1;
  }

  @Transactional()
  async update({
    id,
    location,
    name,
  }: UpdateSchoolInput): ReturnType<SchoolMutationResolver['update']> {
    const school = await this.schoolHelper.findOneOrFail(id);
    school.update({ location, name });
    await this.schoolRepository.save(school);
    return plainToClass(SchoolModel, school);
  }
}
