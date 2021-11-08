import { Test, TestingModule } from '@nestjs/testing';
import { AdminValidator } from '@app/src/admin/application/lib/admin.validator';
import { AdminRepository } from '@app/src/admin/infra/admin.repository';
import { UtilCommon } from '@app/util';
import {
  mockRepository,
  MockRepositoryReturns,
  MockUtilCommonReturns,
  mockUtilCommonValue,
} from '../../mock/function';
import { ConflictException } from '@nestjs/common';

describe('AdminValidator', () => {
  let adminValidator: AdminValidator;
  let mockAdminRepository: MockRepositoryReturns;
  let mockUtilCommon: MockUtilCommonReturns;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminValidator,
        { provide: AdminRepository, useValue: mockRepository() },
        { provide: UtilCommon, useValue: mockUtilCommonValue() },
      ],
    }).compile();

    adminValidator = module.get<AdminValidator>(AdminValidator);
    mockAdminRepository = module.get(AdminRepository);
    mockUtilCommon = module.get(UtilCommon);
  });

  it('should be defined', () => {
    expect(adminValidator).toBeDefined();
  });

  it('if admin already exist, throw error', async () => {
    // when
    jest.spyOn(mockAdminRepository, 'findOne').mockResolvedValue(true);
    // then
    try {
      await adminValidator.ifAlreadyExistThrow('test@naver.com');
    } catch (err) {
      expect(err).toBeInstanceOf(ConflictException);
    } finally {
      expect(mockAdminRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockUtilCommon.throwException).toHaveBeenCalledTimes(1);
    }
  });

  it('if admin not found, throw error', async () => {
    // when
    jest.spyOn(mockAdminRepository, 'findOne').mockResolvedValue(false);
    // then
    await adminValidator.ifAlreadyExistThrow('test@naver.com');
    expect(mockAdminRepository.findOne).toHaveBeenCalledTimes(1);
    expect(mockUtilCommon.throwException).toHaveBeenCalledTimes(0);
  });
});
