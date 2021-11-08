import { Test, TestingModule } from '@nestjs/testing';
import { AdminValidator } from '@app/src/admin/application/lib/admin.validator';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AdminRepository } from '@app/src/admin/infra/admin.repository';
import { UtilCommon } from '@app/util';
import { mockRepository, mockUtilCommon } from '../../common/mock';

describe('AdminValidator', () => {
  let service: AdminValidator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminValidator,
        { provide: getRepositoryToken(AdminRepository), useValue: mockRepository() },
        { provide: UtilCommon, useValue: mockUtilCommon() },
      ],
    }).compile();

    service = module.get<AdminValidator>(AdminValidator);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
