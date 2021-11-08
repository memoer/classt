import { Test, TestingModule } from '@nestjs/testing';
import { SchoolService } from '@app/src/school/application/service/school.service';
import { SchoolHelper } from '@app/src/school/application/lib/school.helper';
import { SchoolValidator } from '@app/src/school/application/lib/school.validator';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SchoolRepository } from '@app/src/school/infra/school.repository';
import { UtilValidator } from '@app/util';
import { mockRepository, mockUtilValidatorValue } from '../../common/mock';

describe('SchoolService', () => {
  let service: SchoolService;
  const mockSchoolHelper = {};
  const mockSchoolValidator = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchoolService,
        { provide: getRepositoryToken(SchoolRepository), useValue: mockRepository() },
        { provide: SchoolHelper, useValue: mockSchoolHelper },
        { provide: UtilValidator, useValue: mockUtilValidatorValue() },
        { provide: SchoolValidator, useValue: mockSchoolValidator },
      ],
    }).compile();

    service = module.get<SchoolService>(SchoolService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
