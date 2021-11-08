import { Test, TestingModule } from '@nestjs/testing';
import { SchoolNewsHelper } from '@app/src/school/application/lib/school-news.helper';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SchoolNewsRepository } from '@app/src/school/infra/school-news.repository';
import { UtilValidator } from '@app/util';
import { mockRepositoryValue, mockUtilValidatorValue } from '../../mock/function';

describe('SchoolNewsHelper', () => {
  let service: SchoolNewsHelper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchoolNewsHelper,
        { provide: getRepositoryToken(SchoolNewsRepository), useValue: mockRepositoryValue() },
        { provide: UtilValidator, useValue: mockUtilValidatorValue() },
      ],
    }).compile();

    service = module.get<SchoolNewsHelper>(SchoolNewsHelper);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
