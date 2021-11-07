import { Test, TestingModule } from '@nestjs/testing';
import { StudentMutationResolver } from './student.resolver';
import { StudentService } from './student.service';

describe('StudentMutationResolver', () => {
  let resolver: StudentMutationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentMutationResolver, StudentService],
    }).compile();

    resolver = module.get<StudentMutationResolver>(StudentMutationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
