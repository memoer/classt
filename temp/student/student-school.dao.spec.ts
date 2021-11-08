import { Test, TestingModule } from '@nestjs/testing';
import { StudentSchoolDAO } from '@app/src/student/infra/student-school.dao';
import { getConnectionToken } from '@nestjs/typeorm';
import { mockConnection } from '../../common/mock';

describe('StudentSchoolDAO', () => {
  let service: StudentSchoolDAO;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentSchoolDAO,
        {
          provide: getConnectionToken(),
          useValue: mockConnection(),
        },
      ],
    }).compile();

    service = module.get<StudentSchoolDAO>(StudentSchoolDAO);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
