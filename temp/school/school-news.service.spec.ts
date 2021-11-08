import { Test, TestingModule } from '@nestjs/testing';
import { SchoolNewsService } from '@app/src/school/application/service/school-news.service';
import { SchoolHelper } from '@app/src/school/application/lib/school.helper';
import { SchoolNewsHelper } from '@app/src/school/application/lib/school-news.helper';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SchoolNewsRepository } from '@app/src/school/infra/school-news.repository';
import { SchoolRepository } from '@app/src/school/infra/school.repository';
import { UtilValidator } from '@app/util';
import { mockEventEmitter, mockRepositoryValue, mockUtilValidatorValue } from '../../mock/function';

describe('SchoolNewsService', () => {
  let service: SchoolNewsService;
  const mockSchoolHelper = {};
  const mockShoolNewHelper = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchoolNewsService,
        { provide: getRepositoryToken(SchoolRepository), useValue: mockRepositoryValue() },
        { provide: SchoolHelper, useValue: mockSchoolHelper },
        { provide: getRepositoryToken(SchoolNewsRepository), useValue: mockRepositoryValue() },
        { provide: SchoolNewsHelper, useValue: mockShoolNewHelper },
        { provide: UtilValidator, useValue: mockUtilValidatorValue() },
        { provide: EventEmitter2, useValue: mockEventEmitter() },
      ],
    }).compile();

    service = module.get<SchoolNewsService>(SchoolNewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
