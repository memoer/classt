import { Injectable } from '@nestjs/common';
import { SchoolNews } from '../../domain/entity/school-news.entity';
import { SchoolNewsRepository } from '../../infra/school-news.repository';
import { SchoolNewsValidator } from './school-news.validator';

@Injectable()
export class SchoolNewsHelper {
  constructor(
    private readonly schoolNewsValidator: SchoolNewsValidator,
    private readonly schoolNewsRepository: SchoolNewsRepository,
  ) {}

  async findOneOrFail(id: number): Promise<SchoolNews> {
    const schoolNews = await this.schoolNewsRepository.findOne(id);
    this.schoolNewsValidator.ifNotFoundThrow(schoolNews);
    return schoolNews;
  }
}
