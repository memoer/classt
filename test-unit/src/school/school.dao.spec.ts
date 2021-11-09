import { Test, TestingModule } from '@nestjs/testing';
import * as cf from 'class-transformer';
import { SchoolDAO } from '@app/src/school/infra/school.dao';
import { getConnectionToken } from '@nestjs/typeorm';
import { UtilDAO } from '@app/util';
import {
  MockConnectionReturns,
  mockConnectionValue,
  MockUtilDAOReturns,
  mockUtilDAOValue,
} from '../../mock/value';
import { PaginationInputBySkip } from '@app/config/graphql/core.dto';

describe('SchoolDAO', () => {
  let schoolDAO: SchoolDAO;
  let mockConnection: MockConnectionReturns;
  let mockUtilDAO: MockUtilDAOReturns;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchoolDAO,
        { provide: getConnectionToken(), useValue: mockConnectionValue() },
        { provide: UtilDAO, useValue: mockUtilDAOValue() },
      ],
    }).compile();

    schoolDAO = module.get<SchoolDAO>(SchoolDAO);
    mockConnection = module.get(getConnectionToken());
    mockUtilDAO = module.get(UtilDAO);
  });

  it('should be defined', () => {
    expect(schoolDAO).toBeDefined();
  });

  it('getListSubscribed', async () => {
    // value
    const input: PaginationInputBySkip = { pageNumber: 1, pageSize: 10 };
    const getSkipReturn = 'skip';
    const getManyAndCountReturn = [[{ school: 1 }, { school: 2 }, { school: 3 }], 'totalCount'];
    const expected = ['data', getManyAndCountReturn[1]];
    // when
    mockUtilDAO.getSkip.mockReturnValue(getSkipReturn);
    mockConnection.getManyAndCount.mockResolvedValue(getManyAndCountReturn);
    jest.spyOn(cf, 'plainToClass').mockReturnValue(expected[0]);
    // then
    const result = await schoolDAO.getListSubscribed(1, input);
    expect(mockConnection.createQueryBuilder).toHaveBeenCalledTimes(1);
    expect(mockConnection.select).toHaveBeenCalledTimes(1);
    expect(mockConnection.from).toHaveBeenCalledTimes(1);
    expect(mockConnection.innerJoin).toHaveBeenCalledTimes(1);
    expect(mockConnection.where).toHaveBeenCalledTimes(1);
    expect(mockConnection.limit).toHaveBeenNthCalledWith(1, input.pageSize);
    expect(mockUtilDAO.getSkip).toHaveBeenNthCalledWith(1, input);
    expect(mockConnection.skip).toHaveBeenNthCalledWith(1, getSkipReturn);
    expect(mockConnection.getManyAndCount).toHaveBeenCalledTimes(1);
    expect(cf.plainToClass).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expected);
  });
});
