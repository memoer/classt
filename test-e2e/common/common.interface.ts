export class PaginationOutput<T> {
  dataList: T[];
  curPage: number;
  totalPage: number;
  hasNextPage: boolean;
}
