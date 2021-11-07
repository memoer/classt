export class GetMsArgs {
  type: 'minute' | 'hour' | 'day';
  number: number;
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

export class SplitListArgs<T> {
  chunk: number;
  list: T[];
}
