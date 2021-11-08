import { Test, TestingModule } from '@nestjs/testing';
import { SchoolValidator } from '@app/src/school/application/lib/school.validator';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SchoolRepository } from '@app/src/school/infra/school.repository';
import { UtilCommon } from '@app/util';
import { mockRepositoryValue, mockUtilCommonValue } from '../../mock/function';

describe('SchoolValidator', () => {
  let service: SchoolValidator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchoolValidator,
        { provide: getRepositoryToken(SchoolRepository), useValue: mockRepositoryValue() },
        { provide: UtilCommon, useValue: mockUtilCommonValue() },
      ],
    }).compile();

    service = module.get<SchoolValidator>(SchoolValidator);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
