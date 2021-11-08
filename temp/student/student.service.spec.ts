import { Test, TestingModule } from '@nestjs/testing';
import { StudentService } from '@app/src/student/application/service/student.service';
import { StudentValidator } from '@app/src/student/application/lib/student.validator';
import { StudentRepository } from '@app/src/student/infra/student.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UtilHash, UtilJwt, UtilValidator } from '@app/util';
import {
  mockRepository,
  mockUtilHashValue,
  mockUtilJwtValue,
  mockUtilValidatorValue,
} from '../../common/mock';

describe('StudentService', () => {
  let service: StudentService;
  const mockStudentValidator = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        { provide: getRepositoryToken(StudentRepository), useValue: mockRepositoryValue() },
        { provide: UtilHash, useValue: mockUtilHashValue() },
        { provide: UtilJwt, useValue: mockUtilJwtValue() },
        { provide: UtilValidator, useValue: mockUtilValidatorValue() },
        { provide: StudentValidator, useValue: mockStudentValidator },
      ],
    }).compile();

    service = module.get<StudentService>(StudentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
