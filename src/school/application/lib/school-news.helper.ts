import { UtilValidator } from '@app/util/util-validator';
import { Injectable } from '@nestjs/common';
import { SchoolNews } from '../../domain/entity/school-news.entity';
import { SchoolNewsRepository } from '../../infra/school-news.repository';

@Injectable()
export class SchoolNewsHelper {
  constructor(
    private readonly utilVlidator: UtilValidator,
    private readonly schoolNewsRepository: SchoolNewsRepository,
  ) {}

  async findOneOrFail(id: number): Promise<SchoolNews> {
    const schoolNews = await this.schoolNewsRepository.findOne(id);
    this.utilVlidator.ifNotFoundThrow({ entity: schoolNews, errorMsg: '없는 학교 소식입니다.' });
    return schoolNews;
  }
}
