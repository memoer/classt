import { Injectable } from '@nestjs/common';
import { SchoolNews } from '../../domain/entity/school-news.entity';
import { CreateSchoolNewsInput } from '../../dto/create-school-news.in';
import { DeleteSchoolNewsArgs } from '../../dto/delete-school-news.in';
import { UpdateSchoolNewsInput } from '../../dto/update-school.news.in';
import { SchoolNewsRepository } from '../../infra/school-news.repository';
import { SchoolRepository } from '../../infra/school.repository';
import { SchoolNewsMutationResolver } from '../../resolver/school-news-mutation.resolver';
import { SchoolNewsHelper } from '../lib/school-news.helper';
import { SchoolNewsValidator } from '../lib/school-news.validator';
import { SchoolHelper } from '../lib/school.helper';

@Injectable()
export class SchoolNewsService {
  constructor(
    private readonly schoolHelper: SchoolHelper,
    private readonly schoolRepository: SchoolRepository,
    private readonly schoolNewsValidator: SchoolNewsValidator,
    private readonly schoolNewsRepository: SchoolNewsRepository,
    private readonly schoolNewsHelper: SchoolNewsHelper,
  ) {}

  async create({
    schoolId,
    information,
  }: CreateSchoolNewsInput): ReturnType<SchoolNewsMutationResolver['create']> {
    const school = await this.schoolHelper.findOneOrFail(schoolId);
    school.addNews([{ information }]);
    await this.schoolRepository.save(school);
    return true;
  }

  async delete(id: DeleteSchoolNewsArgs['id']): ReturnType<SchoolNewsMutationResolver['delete']> {
    const schoolNews = await this.schoolNewsRepository.findOne(id, { select: ['id'] });
    this.schoolNewsValidator.ifNotFoundThrow(schoolNews);
    const result = await this.schoolNewsRepository.softDelete(id);
    return result.affected === 1;
  }

  async update({
    id,
    information,
  }: UpdateSchoolNewsInput): ReturnType<SchoolNewsMutationResolver['update']> {
    const schoolNews = await this.schoolNewsHelper.findOneOrFail(id);
    schoolNews.update<SchoolNews>({ information });
    await this.schoolNewsRepository.save(schoolNews);
    return true;
  }
}
