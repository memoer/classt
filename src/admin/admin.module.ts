import { Module } from '@nestjs/common';
import { AdminService } from './application/admin.service';
import { AdminQueryResolver } from './resolver/admin-query.resolver';

@Module({
  providers: [AdminQueryResolver, AdminService],
})
export class AdminModule {}
