import { Test, TestingModule } from '@nestjs/testing';
import { StudentValidator } from '@app/src/student/application/lib/student.validator';
import { UtilCommon } from '@app/util';
import { mockUtilCommon } from '../../common/mock';

describe('StudentValidator', () => {
  let service: StudentValidator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentValidator, { provide: UtilCommon, useValue: mockUtilCommon() }],
    }).compile();

    service = module.get<StudentValidator>(StudentValidator);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});