import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminAuthService } from './application/service/admin-auth.service';
import { AdminService } from './application/service/admin.service';
import { AdminAuthDAO } from './infra/admin-auth.dao';
import { AdminRepository } from './infra/admin.repository';
import { AdminAuthMutationResolver } from './resolver/admin-auth-mutation.resolver';
import { AdminMutationResolver } from './resolver/admin-mutation.resolver';
import { AdminQueryResolver } from './resolver/admin-query.resolver';
import { AdminTypeResolver } from './resolver/admin-type.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([AdminRepository])],
  providers: [
    // 표현
    AdminQueryResolver,
    AdminMutationResolver,
    AdminTypeResolver,
    AdminAuthMutationResolver,
    // 응용
    AdminService,
    AdminAuthService,
    // 인프라
    AdminAuthDAO,
  ],
})
export class AdminModule {}
