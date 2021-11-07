import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { DiffTimeArgs } from './dto/util-validator.dto';

@Injectable()
export class UtilValidator {
  isFutureFromNow({ diff, unit }: DiffTimeArgs): boolean {
    const now = dayjs();
    return dayjs(diff).diff(now, unit) < 0;
  }

  isPastFromNow({ diff, unit }: DiffTimeArgs): boolean {
    const now = dayjs();
    return dayjs(diff).diff(now, unit) > 0;
  }
}
