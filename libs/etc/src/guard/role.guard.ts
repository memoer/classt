import { GqlCtx } from '@app/config';
import { AdminAuthType } from '@app/src/admin/domain/entity/admin-auth.entity';
import { Admin } from '@app/src/admin/domain/entity/admin.entity';
import {
  applyDecorators,
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ApiBearerAuthGuard } from './api-bearer-auth.guard';
import { AuthGuardOf } from './auth.guard';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user } = GqlExecutionContext.create(context).getContext<GqlCtx>().req;
    const requiredAuth = this.reflector.get<AdminAuthType[]>('auth', context.getHandler());
    return (<Admin>user).authList.some((auth) => requiredAuth.includes(auth.type));
  }
}

export function RoleGuardOf(...auth: AdminAuthType[]): ReturnType<typeof applyDecorators> {
  return applyDecorators(
    SetMetadata('auth', auth),
    UseGuards(ApiBearerAuthGuard, AuthGuardOf('ADMIN'), RoleGuard),
  );
}
