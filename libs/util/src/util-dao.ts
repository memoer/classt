import { Injectable } from '@nestjs/common';
import { UtilCommon } from './util-common';
import { FindAndCountArgs, VisibleOnPublishedArgs } from './dto/util-dao.dto';
import { plainToClass } from 'class-transformer';

// 당분간 쓰지 않는 걸로
@Injectable()
export class UtilDAO {
  constructor(private readonly utilCommon: UtilCommon) {}

  visibleOnPublished({ alias, condition, at }: VisibleOnPublishedArgs): string {
    const sign = condition === 'equal' ? '=' : '<=';
    return `${alias}.publishedAt ${sign} '${this.utilCommon.getLocalDate(at)}'`;
  }

  async findAndCount<T>({
    baseQb,
    page,
    mapper,
    random,
    offset,
  }: FindAndCountArgs<T>): Promise<[T[], number]> {
    if (random) {
      const dataList = await baseQb.limit(page.pageSize).orderBy('RANDOM()').getMany();
      return [plainToClass(mapper, dataList), dataList.length];
    }
    if (offset === 'limit') baseQb.limit(page.pageSize);
    else baseQb.take(page.pageSize);
    const [dataList, count] = (await baseQb
      .skip(this.utilCommon.getSkip(page))
      .getManyAndCount()) as [T[], number];
    return [plainToClass(mapper, dataList), count];
  }

  async findRawAndCount<T>({ baseQb, page, mapper }: FindAndCountArgs<T>): Promise<[T[], number]> {
    const clonedBaseQb = baseQb.clone();
    const dataList = await baseQb
      .take(page.pageSize)
      .skip(this.utilCommon.getSkip(page))
      .getRawMany();
    const count = await clonedBaseQb.getCount();
    return [plainToClass(mapper, dataList), count];
  }

  rawToModel<T>(data: Record<string, any>, rootAlias: string): T {
    return Object.keys(data).reduce((obj, key) => {
      const [tableAlias, columnName] = key.split('_');
      if (tableAlias === rootAlias) {
        obj[columnName] = data[key];
      } else {
        if (obj[tableAlias] === undefined) obj[tableAlias] = {};
        obj[tableAlias][columnName] = data[key];
      }
      return obj;
    }, {}) as T;
  }
}
