import { GqlCtx } from '@app/config';
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
import { Connection } from 'typeorm';
import { GetUserArgs } from '../dto/auth-guard.dto';
import { ApiBearerAuthGuard } from './api-bearer-auth.guard';

@Injectable()
export class AuthGuard implements CanActivate {
  static readonly TYPE = {
    STUDENT: 'student',
    ADMIN: 'admin',
  };

  constructor(private readonly reflector: Reflector, private readonly dbConn: Connection) {}

  private getAdmin(id: number): Promise<Admin> {
    return this.dbConn
      .createQueryBuilder()
      .select(['admin', 'admin_auth'])
      .from(Admin, 'admin')
      .leftJoinAndSelect('admin.authList', 'admin_auth')
      .where('admin.id = :id', { id })
      .getOne();
  }

  private async getStudent(id: number): Promise<boolean> {
    return true;
  }

  private getUser({ id, type }: GetUserArgs): Promise<Admin | boolean> {
    switch (type) {
      case 'ADMIN':
        return this.getAdmin(id);
      case 'STUDENT':
        return this.getStudent(id);
      default:
        return null;
    }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const type = this.reflector.getAllAndOverride<keyof typeof AuthGuard.TYPE>('type', [
      context.getHandler(),
      context.getClass(),
    ]);
    const ctx = GqlExecutionContext.create(context).getContext<GqlCtx>();
    if (ctx.req.user.id) {
      const user = await this.getUser({ id: ctx.req.user.id, type });
      if (!user) return false;
      ctx.req.user = user;
      return true;
    }
    return false;
  }
}

export function AuthGuardOf(type: keyof typeof AuthGuard.TYPE): ReturnType<typeof applyDecorators> {
  return applyDecorators(SetMetadata('type', type), UseGuards(ApiBearerAuthGuard, AuthGuard));
}
