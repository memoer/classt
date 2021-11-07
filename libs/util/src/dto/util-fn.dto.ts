import * as Exceptions from '@nestjs/common/exceptions';

export class ThrowExceptionArgs {
  type: Exclude<keyof typeof Exceptions, 'HttpException'>;
  msg?: string;
}
