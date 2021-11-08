import { Test, TestingModule } from '@nestjs/testing';
import { StudentSchoolService } from '@app/src/student/application/service/student-school.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StudentRepository } from '@app/src/student/infra/student.repository';
import { mockRepository } from '../../common/mock';

describe('StudentSchoolService', () => {
  let service: StudentSchoolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentSchoolService,
        { provide: getRepositoryToken(StudentRepository), useValue: mockRepositoryValue() },
      ],
    }).compile();

    service = module.get<StudentSchoolService>(StudentSchoolService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
