import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminValidator } from './application/lib/admin.validator';
import { AdminService } from './application/service/admin.service';
import { AdminAuthDAO } from './infra/admin-auth.dao';
import { AdminRepository } from './infra/admin.repository';
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
    // 응용
    AdminService,
    AdminValidator,
    // 인프라
    AdminAuthDAO,
  ],
})
export class AdminModule {}
