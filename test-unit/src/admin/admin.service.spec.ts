import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from '@app/src/admin/application/service/admin.service';
import { AdminValidator } from '@app/src/admin/application/lib/admin.validator';
import { AdminRepository } from '@app/src/admin/infra/admin.repository';
import { UtilHash, UtilValidator } from '@app/util';
import { UtilJwt } from '@app/util/util-jwt';
import { mockRepository, mockUtilHash } from '../../mock/function';

describe('AdminService', () => {
  let service: AdminService;
  const mockAdminValidator = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        { provide: AdminRepository, useValue: mockRepository() },
        { provide: UtilHash, useValue: mockUtilHash() },
        { provide: UtilValidator, useValue: mockUtilHash() },
        { provide: UtilJwt, useValue: mockUtilHash() },
        { provide: AdminValidator, useValue: mockAdminValidator },
      ],
    }).compile();

    service = module.get<AdminService>(AdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
