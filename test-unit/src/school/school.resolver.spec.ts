import { Test, TestingModule } from '@nestjs/testing';
import { SchoolQueryResolver } from './school.resolver';
import { SchoolService } from './school.service';

describe('SchoolQueryResolver', () => {
  let resolver: SchoolQueryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchoolQueryResolver, SchoolService],
    }).compile();

    resolver = module.get<SchoolQueryResolver>(SchoolQueryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
