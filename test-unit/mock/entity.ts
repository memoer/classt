import { AdminAuth, AdminAuthType } from '@app/src/admin/domain/entity/admin-auth.entity';
import { Admin } from '@app/src/admin/domain/entity/admin.entity';

export const mockAdmin = (): Admin => {
  const admin = new Admin();
  admin.id = 1;
  admin.email = 'admin@naver.com';
  admin.name = 'admin';
  admin.password = 'q1w2e3#';
  admin.authList = [
    mockAdminAuth(admin.id, AdminAuthType.CREATE_SCHOOL),
    mockAdminAuth(admin.id, AdminAuthType.DELETE_SCHOOL),
  ];
  return admin;
};
export const mockAdminAuth = (adminId: number, type: AdminAuthType): AdminAuth => {
  return AdminAuth.createAdminAuth({ adminId, type });
};
