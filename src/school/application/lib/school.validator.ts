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
        msg: '해당 Id는 없는 관리자 입니다.',
      });
    }
  }
}
