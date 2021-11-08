import { Test, TestingModule } from '@nestjs/testing';
import { SchoolHelper } from '@app/src/school/application/lib/school.helper';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SchoolRepository } from '@app/src/school/infra/school.repository';
import { UtilValidator } from '@app/util';
import { mockRepository, mockUtilValidatorValue } from '../../common/mock';

describe('SchoolHelper', () => {
  let service: SchoolHelper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchoolHelper,
        { provide: getRepositoryToken(SchoolRepository), useValue: mockRepositoryValue() },
        { provide: UtilValidator, useValue: mockUtilValidatorValue() },
      ],
    }).compile();

    service = module.get<SchoolHelper>(SchoolHelper);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
