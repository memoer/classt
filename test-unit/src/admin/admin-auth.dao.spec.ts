import { Test, TestingModule } from '@nestjs/testing';
import { AdminAuthDAO } from '@app/src/admin/infra/admin-auth.dao';
import { getConnectionToken } from '@nestjs/typeorm';
import { mockConnection } from '../../common/mock';

describe('AdminAuthService', () => {
  let service: AdminAuthDAO;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminAuthDAO, { provide: getConnectionToken(), useValue: mockConnection() }],
    }).compile();

    service = module.get<AdminAuthDAO>(AdminAuthDAO);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
