import { Test, TestingModule } from '@nestjs/testing';
import * as cf from 'class-transformer';
import { AdminAuthService } from '@app/src/admin/application/service/admin-auth.service';
import { AdminRepository } from '@app/src/admin/infra/admin.repository';
import { mockRepositoryValue, MockRepositoryReturns } from '../../mock/function';
import { Admin } from '@app/src/admin/domain/entity/admin.entity';
import { AdminAuth, AdminAuthType } from '@app/src/admin/domain/entity/admin-auth.entity';
import { mockAdmin } from '../../mock/entity';

describe('AdminAuthService', () => {
  let adminAuthService: AdminAuthService;
  let mockAdminRepository: MockRepositoryReturns;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminAuthService, { provide: AdminRepository, useValue: mockRepositoryValue() }],
    }).compile();

    adminAuthService = module.get<AdminAuthService>(AdminAuthService);
    mockAdminRepository = module.get(AdminRepository);
  });

  it('should be defined', () => {
    expect(adminAuthService).toBeDefined();
  });

  it('add', async () => {
    // value
    const input: { admin: Admin; newAuthTypeList: AdminAuthType[] } = {
      admin: mockAdmin(),
      newAuthTypeList: [AdminAuthType.DELETE_SCHOOL],
    };
    const expected = 'success';
    // when
    jest.spyOn(AdminAuth, 'createAdminAuth');
    jest.spyOn(Admin.prototype, 'addAuth');
    jest.spyOn(cf, 'plainToClass').mockReturnValue(expected);
    // then
    const result = await adminAuthService.add(input.admin, input.newAuthTypeList);
    expect(AdminAuth.createAdminAuth).toHaveBeenCalledTimes(input.newAuthTypeList.length);
    expect(input.admin.addAuth).toHaveBeenCalledTimes(1);
    expect(mockAdminRepository.save).toHaveBeenCalledTimes(1);
    expect(cf.plainToClass).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expected);
  });

  it('delete', async () => {
    // value
    const input: { admin: Admin; authTypeToDeleteList: AdminAuthType[] } = {
      admin: mockAdmin(),
      authTypeToDeleteList: [AdminAuthType.DELETE_SCHOOL],
    };
    // when
    jest.spyOn(Admin.prototype, 'deleteAuth');
    // then
    const result = await adminAuthService.delete(input.admin, input.authTypeToDeleteList);
    expect(input.admin.deleteAuth).toHaveBeenCalledTimes(1);
    expect(mockAdminRepository.save).toHaveBeenCalledTimes(1);
    expect(result).toEqual(true);
  });
});
