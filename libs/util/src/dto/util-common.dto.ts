export class GetMsArgs {
  type: 'minute' | 'hour' | 'day';
  number: number;
}

export class SplitListArgs<T> {
  chunk: number;
  list: T[];
}
