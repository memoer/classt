import { Test, TestingModule } from '@nestjs/testing';
import { SchoolNewsDAO } from '@app/src/school/infra/school-news.dao';
import { getConnectionToken } from '@nestjs/typeorm';
import { mockConnection, mockUtilDAO } from '../../common/mock';
import { UtilDAO } from '@app/util';

describe('SchoolNewsDAO', () => {
  let service: SchoolNewsDAO;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchoolNewsDAO,
        { provide: getConnectionToken(), useValue: mockConnection() },
        { provide: UtilDAO, useValue: mockUtilDAO() },
      ],
    }).compile();

    service = module.get<SchoolNewsDAO>(SchoolNewsDAO);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
