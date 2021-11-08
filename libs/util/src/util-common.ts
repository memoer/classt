import { Injectable } from '@nestjs/common';
import { GetMsArgs, SplitListArgs } from './dto/util-common.dto';
import { ExceptionArgs } from './dto/util-fn.dto';
import * as Exceptions from '@nestjs/common/exceptions';
import * as dayjs from 'dayjs';

// * 기본 유틸성 서비스
@Injectable()
export class UtilCommon {
  isNone(data: null | undefined | any): boolean {
    if (data === null || data === undefined) return true;
    return false;
  }

  isEnvOf(...envs: typeof process.env.NODE_ENV[]): boolean {
    return envs.includes(process.env.NODE_ENV);
  }

  getLocalDate(d?: Date): string {
    return dayjs(d).format('YYYY-MM-DD');
  }

  getMs({ type, number }: GetMsArgs): number {
    const oneMilliSecond = 1000;
    const oneMinute = 60 * oneMilliSecond;
    const oneHour = 60 * oneMinute;
    const oneDay = 24 * oneHour;
    switch (type) {
      case 'minute':
        return number * oneMinute;
      case 'hour':
        return number + oneHour;
      case 'day':
        return number + oneDay;
      default:
        return number * oneMilliSecond;
    }
  }

  exception({ type, msg }: ExceptionArgs): Error {
    return new Exceptions[type](msg);
  }

  splitList<T>({ chunk, list }: SplitListArgs<T>): T[][] {
    const temp = [];
    while (list.length !== 0) temp.push(list.splice(0, chunk));
    return temp;
  }
}
