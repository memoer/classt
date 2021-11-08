import * as Exceptions from '@nestjs/common/exceptions';

export class ExceptionArgs {
  type: Exclude<keyof typeof Exceptions, 'HttpException'>;
  msg?: string;
}
