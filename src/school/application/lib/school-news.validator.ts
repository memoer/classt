import { UtilCommon } from '@app/util';
import { Injectable } from '@nestjs/common';
import { SchoolNews } from '../../domain/entity/school-news.entity';

@Injectable()
export class SchoolNewsValidator {
  constructor(private readonly utilCommon: UtilCommon) {}

  ifNotFoundThrow(entity: SchoolNews): void {
    if (!entity) {
      this.utilCommon.throwException({
        type: 'NotFoundException',
        msg: `${entity.id}/없는 학교 소식입니다.`,
      });
    }
  }
}
