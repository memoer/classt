import { Test, TestingModule } from '@nestjs/testing';
import { AdminAuthService } from '@app/src/admin/application/service/admin-auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AdminRepository } from '@app/src/admin/infra/admin.repository';
import { mockRepository } from '../../common/mock';

describe('AdminAuthService', () => {
  let service: AdminAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminAuthService,
        { provide: getRepositoryToken(AdminRepository), useValue: mockRepository() },
      ],
    }).compile();

    service = module.get<AdminAuthService>(AdminAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
