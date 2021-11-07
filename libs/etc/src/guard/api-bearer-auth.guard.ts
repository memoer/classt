import { GqlCtx } from '@app/config';
import { UtilJwt } from '@app/util/util-jwt';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class ApiBearerAuthGuard implements CanActivate {
  constructor(private readonly utilJwt: UtilJwt) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { req } = GqlExecutionContext.create(context).getContext<GqlCtx>();
    const [type, token] = req.headers.authorization.split(' ');
    if (type !== 'Bearer') return false;
    const decoded = this.utilJwt.verify(token.toString());
    if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
      req.user = { id: decoded.id };
      return true;
    }
    return false;
  }
}
