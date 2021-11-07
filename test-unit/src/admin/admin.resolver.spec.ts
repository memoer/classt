import { Test, TestingModule } from '@nestjs/testing';
import { AdminQueryResolver } from './admin.resolver';
import { AdminService } from './admin.service';

describe('AdminQueryResolver', () => {
  let resolver: AdminQueryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminQueryResolver, AdminService],
    }).compile();

    resolver = module.get<AdminQueryResolver>(AdminQueryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
