import { Test, TestingModule } from '@nestjs/testing';
import { SchoolMutationResolver } from './school.resolver';
import { SchoolService } from './school.service';

describe('SchoolMutationResolver', () => {
  let resolver: SchoolMutationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchoolMutationResolver, SchoolService],
    }).compile();

    resolver = module.get<SchoolMutationResolver>(SchoolMutationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
