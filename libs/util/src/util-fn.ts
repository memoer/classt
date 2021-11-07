import * as Exceptions from '@nestjs/common/exceptions';
import { ThrowExceptionArgs } from './dto/util-fn.dto';

// 왠만하면 사용하지 말 것 [ DI를 할 수 없는 환경에서 사용할 것 ]
// Ex) user.repository.ts 에서 사용중 -> DI를 하는 곳이 아님 [ 인프라 계층이기 때문에 의존성이 없어야 한다. ]
export function throwException({ type, msg }: ThrowExceptionArgs): Error {
  throw new Exceptions[type]({
    msg,
  });
}
