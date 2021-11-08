import { Test, TestingModule } from '@nestjs/testing';
import * as cf from 'class-transformer';
import { AdminAuthDAO } from '@app/src/admin/infra/admin-auth.dao';
import { getConnectionToken } from '@nestjs/typeorm';
import { AdminAuthModel } from '@app/src/admin/dto/admin-auth.model';
import { AdminAuthType } from '@app/src/admin/domain/entity/admin-auth.entity';
import { mockConnection, MockConnectionReturns } from '../../mock/function';

describe('AdminAuthService', () => {
  let adminAuthDAO: AdminAuthDAO;
  let mockDBConnection: MockConnectionReturns;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminAuthDAO, { provide: getConnectionToken(), useValue: mockConnection() }],
    }).compile();

    adminAuthDAO = module.get<AdminAuthDAO>(AdminAuthDAO);
    mockDBConnection = module.get(getConnectionToken());
  });

  it('should be defined', () => {
    expect(adminAuthDAO).toBeDefined();
  });

  it('should be return AdminAuthModel', async () => {
    // value
    const expected: AdminAuthModel[] = [{ id: 1, type: AdminAuthType.CREATE_SCHOOL }];
    // when
    jest.spyOn(mockDBConnection, 'getMany').mockResolvedValue(expected);
    jest.spyOn(cf, 'plainToClass').mockReturnValue(expected);
    // then
    const result = await adminAuthDAO.findMany(1);
    expect(mockDBConnection.createQueryBuilder).toHaveBeenCalledTimes(1);
    expect(mockDBConnection.from).toHaveBeenCalledTimes(1);
    expect(mockDBConnection.where).toHaveBeenCalledTimes(1);
    expect(mockDBConnection.getMany).toHaveBeenCalledTimes(1);
    expect(cf.plainToClass).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expected);
  });
});
