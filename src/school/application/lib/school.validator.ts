import { UtilCommon } from '@app/util';
import { Injectable } from '@nestjs/common';
import { School } from '../../domain/entity/school.entity';

@Injectable()
export class SchoolValidator {
  constructor(private readonly utilCommon: UtilCommon) {}

  ifNotFoundThrow(entity: School): void {
    if (!entity) {
      this.utilCommon.throwException({
        type: 'NotFoundException',
        msg: `${entity.id}/저장되어 있지 않은 학교입니다.`,
      });
    }
  }
}
