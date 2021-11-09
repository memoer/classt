import { Test, TestingModule } from '@nestjs/testing';
import * as cf from 'class-transformer';
import { SchoolNewsDAO } from '@app/src/school/infra/school-news.dao';
import { getConnectionToken } from '@nestjs/typeorm';
import {
  MockConnectionReturns,
  mockConnectionValue,
  MockUtilDAOReturns,
  mockUtilDAOValue,
} from '../../mock/value';
import { UtilDAO } from '@app/util';
import { GetListSubscribedSchoolNewsInput } from '@app/src/school/dto/get-list-subscribed-school-news.in';
import { PaginationInputBySkip } from '@app/config/graphql/core.dto';
import exp from 'constants';

describe('SchoolNewsDAO', () => {
  let schoolNewsDAO: SchoolNewsDAO;
  let mockConnection: MockConnectionReturns;
  let mockUtilDAO: MockUtilDAOReturns;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchoolNewsDAO,
        { provide: getConnectionToken(), useValue: mockConnectionValue() },
        { provide: UtilDAO, useValue: mockUtilDAOValue() },
      ],
    }).compile();

    schoolNewsDAO = module.get<SchoolNewsDAO>(SchoolNewsDAO);
    mockConnection = module.get(getConnectionToken());
    mockUtilDAO = module.get(UtilDAO);
    jest.spyOn(cf, 'plainToClass').mockClear();
  });

  it('should be defined', () => {
    expect(schoolNewsDAO).toBeDefined();
  });

  it('getListSubscribed: if result is undefined, return [[], 0]', async () => {
    // value
    const studentId = 98;
    const input: GetListSubscribedSchoolNewsInput = { pageNumber: 1, pageSize: 10, schoolId: 99 };
    const expected = [[], 0];
    // when
    mockConnection.getRawOne.mockResolvedValueOnce(undefined);
    // then
    const result = await schoolNewsDAO.getListSubscribed(studentId, input);
    expect(mockConnection.createQueryBuilder).toHaveBeenCalledTimes(1);
    expect(mockConnection.select).toHaveBeenCalledTimes(1);
    expect(mockConnection.from).toHaveBeenCalledTimes(1);
    expect(mockConnection.innerJoin).toHaveBeenCalledTimes(1);
    expect(mockConnection.where).toHaveBeenCalledTimes(1);
    expect(mockConnection.getRawOne).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expected);
  });

  it('getListSubscribed: success', async () => {
    // value
    const studentId = 98;
    const input: GetListSubscribedSchoolNewsInput = { pageNumber: 1, pageSize: 10, schoolId: 99 };
    const getRawOneReturn = { sId: 97 };
    const getManyAndCountReturn = ['dataList', 57];
    const expected = ['dataListModel', getManyAndCountReturn[1]];
    // when
    mockConnection.getRawOne.mockResolvedValueOnce(getRawOneReturn);
    mockConnection.getManyAndCount.mockResolvedValue(getManyAndCountReturn);
    jest.spyOn(cf, 'plainToClass').mockReturnValue(expected[0]);
    // then
    const result = await schoolNewsDAO.getListSubscribed(studentId, input);
    expect(mockConnection.createQueryBuilder).toHaveBeenCalledTimes(2);
    expect(mockConnection.select).toHaveBeenCalledTimes(2);
    expect(mockConnection.from).toHaveBeenCalledTimes(2);
    expect(mockConnection.innerJoin).toHaveBeenCalledTimes(1);
    expect(mockConnection.where).toHaveBeenCalledTimes(2);
    expect(mockConnection.getRawOne).toHaveBeenCalledTimes(1);
    expect(mockConnection.limit).toHaveBeenCalledTimes(1);
    expect(mockConnection.skip).toHaveBeenCalledTimes(1);
    expect(mockConnection.orderBy).toHaveBeenCalledTimes(1);
    expect(mockConnection.getManyAndCount).toHaveBeenCalledTimes(1);
    expect(cf.plainToClass).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expected);
  });

  it('getListArchived', async () => {
    // value
    const studentId = 94;
    const input: PaginationInputBySkip = { pageNumber: 1, pageSize: 10 };
    const getSkipReturn = 'skip';
    const getManyAndCountReturn = [
      [{ schoolNews: '1' }, { schoolNews: '2' }, { schoolNews: '3' }],
      3,
    ];
    const expected = ['dataListModel', getManyAndCountReturn[1]];
    // when
    mockUtilDAO.getSkip.mockReturnValue(getSkipReturn);
    mockConnection.getManyAndCount.mockResolvedValue(getManyAndCountReturn);
    jest.spyOn(cf, 'plainToClass').mockReturnValue(expected[0]);
    // then
    const result = await schoolNewsDAO.getListArchived(studentId, input);
    expect(mockConnection.createQueryBuilder).toHaveBeenCalledTimes(1);
    expect(mockConnection.select).toHaveBeenCalledTimes(1);
    expect(mockConnection.from).toHaveBeenCalledTimes(1);
    expect(mockConnection.innerJoin).toHaveBeenCalledTimes(1);
    expect(mockConnection.where).toHaveBeenCalledTimes(1);
    expect(mockConnection.limit).toHaveBeenNthCalledWith(1, input.pageSize);
    expect(mockUtilDAO.getSkip).toHaveBeenNthCalledWith(1, input);
    expect(mockConnection.skip).toHaveBeenNthCalledWith(1, getSkipReturn);
    expect(mockConnection.orderBy).toHaveBeenCalledTimes(1);
    expect(mockConnection.getManyAndCount).toHaveBeenCalledTimes(1);
    expect(cf.plainToClass).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expected);
  });
});
