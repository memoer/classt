import { Resolver } from '@nestjs/graphql';
import { AdminService } from '../application/admin.service';

@Resolver()
export class AdminQueryResolver {
  constructor(private readonly adminService: AdminService) {}
}
