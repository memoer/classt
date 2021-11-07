import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { plainToClass } from 'class-transformer';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { SchoolNews } from '../../domain/entity/school-news.entity';
import { CreateSchoolNewsInput } from '../../dto/create-school-news.in';
import { DeleteSchoolNewsArgs } from '../../dto/delete-school-news.in';
import { SchoolNewsCreatedEvent } from '../../dto/school-news-created-event.in';
import { SchoolNewsModel } from '../../dto/school-news.model';
import { UpdateSchoolNewsInput } from '../../dto/update-school.news.in';
import { SchoolNewsEvent } from '../../infra/schoo-news.event';
import { SchoolNewsRepository } from '../../infra/school-news.repository';
import { SchoolRepository } from '../../infra/school.repository';
import { SchoolNewsMutationResolver } from '../../resolver/school-news-mutation.resolver';
import { SchoolNewsHelper } from '../lib/school-news.helper';
import { SchoolNewsValidator } from '../lib/school-news.validator';
import { SchoolHelper } from '../lib/school.helper';

@Injectable()
export class SchoolNewsService {
  constructor(
    private readonly schoolRepository: SchoolRepository,
    private readonly schoolHelper: SchoolHelper,
    private readonly schoolNewsRepository: SchoolNewsRepository,
    private readonly schoolNewsHelper: SchoolNewsHelper,
    private readonly schoolNewsValidator: SchoolNewsValidator,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Transactional()
  async create({
    schoolId,
    information,
  }: CreateSchoolNewsInput): ReturnType<SchoolNewsMutationResolver['create']> {
    const school = await this.schoolHelper.findOneOrFail(schoolId, {
      relations: ['schoolNewsList'],
    });
    const newSchoolNews = SchoolNews.createSchoolNews({ information });
    school.addNews(newSchoolNews);
    await this.schoolRepository.save(school);
    this.eventEmitter.emit(
      SchoolNewsEvent.CREATED,
      new SchoolNewsCreatedEvent({ schoolId: school.id, schoolNewsId: newSchoolNews.id }),
    );
    return plainToClass(SchoolNews, newSchoolNews);
  }

  @Transactional()
  async delete(id: DeleteSchoolNewsArgs['id']): ReturnType<SchoolNewsMutationResolver['delete']> {
    const schoolNews = await this.schoolNewsRepository.findOne(id, { select: ['id'] });
    this.schoolNewsValidator.ifNotFoundThrow(schoolNews);
    const result = await this.schoolNewsRepository.softDelete(id);
    return result.affected === 1;
  }

  @Transactional()
  async update({
    id,
    information,
  }: UpdateSchoolNewsInput): ReturnType<SchoolNewsMutationResolver['update']> {
    const schoolNews = await this.schoolNewsHelper.findOneOrFail(id);
    schoolNews.update<SchoolNews>({ information });
    await this.schoolNewsRepository.save(schoolNews);
    return plainToClass(SchoolNewsModel, schoolNews);
  }
}
