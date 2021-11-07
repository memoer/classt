import { GqlCtx } from '@app/config';
import { UtilCommon } from '@app/util';
import { UtilJwt } from '@app/util/util-jwt';
import { Injectable, InternalServerErrorException, NestMiddleware } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { NextFunction } from 'express';
import { Connection } from 'typeorm';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly utilJwt: UtilJwt,
    private readonly utilCommon: UtilCommon,
    @InjectConnection()
    private readonly dbConn: Connection,
  ) {}

  async use(req: GqlCtx['req'], _: Express.Response, next: NextFunction): Promise<void> {
    if (req.headers['authorization']) {
      const [type, token] = req.headers['authorization'].split(' ');
      try {
        if ('Bearer' === type) {
          const decoded = this.utilJwt.verify(token);
          if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
            req.user = { id: 1 };
          }
        }
      } catch (error) {
        if (error.message === 'invalid token') {
          this.utilCommon.throwException({
            type: 'UnauthorizedException',
            msg: 'token invalid',
          });
        }
        throw new InternalServerErrorException(error);
      }
    }
    next();
  }
}
