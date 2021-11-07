import { ClassConstructor } from 'class-transformer';
import { Connection, SelectQueryBuilder } from 'typeorm';

export class FindAndCountArgs<T> {
  baseQb: SelectQueryBuilder<unknown>;
  page: GetSkipArgs;
  mapper: ClassConstructor<T>;
  random?: boolean;
  offset?: 'take' | 'limit';
}

export class GetBaseQbArgs {
  dbConn: Connection;
  from: [string, string];
}

export class VisibleOnPublishedArgs {
  alias: string;
  condition: 'below' | 'equal';
  at?: Date;
}

export class GetSkipArgs {
  pageNumber: number;
  pageSize: number;
}

export class GetPaginationArgs<T> {
  dataList: T[];
  count: number;
  page: { pageNumber: number; pageSize: number };
}
export class GetPaginationOutput<T> {
  dataList: T[];
  totalPage: number;
  curPage: number;
  hasNextPage: boolean;
}
