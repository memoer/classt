import { AdminAuthType } from '../domain/entity/admin-auth.entity';

export class CreateAdminAuthArgs {
  adminId?: number;
  authType: AdminAuthType;
}
