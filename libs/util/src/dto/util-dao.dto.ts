import { ClassConstructor } from 'class-transformer';
import { Connection, SelectQueryBuilder } from 'typeorm';
import { GetSkipArgs } from './util-common.dto';

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
