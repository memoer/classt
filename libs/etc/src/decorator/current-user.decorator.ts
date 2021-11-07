import { throwException } from '@app/util';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator((_: unknown, ctx: ExecutionContext) => {
  const { user } = GqlExecutionContext.create(ctx).getContext().req;
  if (!user) {
    throwException({
      type: 'UnauthorizedException',
      msg: 'Header에 유저 정보 토큰이 없거나, 잘못된 타입으로 보내고 있습니다.',
    });
  }
  return user;
});
