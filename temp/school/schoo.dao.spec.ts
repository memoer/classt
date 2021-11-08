import { Test, TestingModule } from '@nestjs/testing';
import { SchoolDAO } from '@app/src/school/infra/school.dao';
import { getConnectionToken } from '@nestjs/typeorm';
import { UtilDAO } from '@app/util';
import { mockConnectionValue, mockUtilDAO } from '../../mock/function';

describe('SchoolDAO', () => {
  let service: SchoolDAO;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchoolDAO,
        { provide: getConnectionToken(), useValue: mockConnectionValue() },
        { provide: UtilDAO, useValue: mockUtilDAO() },
      ],
    }).compile();

    service = module.get<SchoolDAO>(SchoolDAO);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
