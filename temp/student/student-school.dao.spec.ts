import { Test, TestingModule } from '@nestjs/testing';
import * as cf from 'class-transformer';
import { StudentSchoolDAO } from '@app/src/student/infra/student-school.dao';
import { getConnectionToken } from '@nestjs/typeorm';
import { MockConnectionReturns, mockConnectionValue } from '../../mock/function';

describe('StudentSchoolDAO', () => {
  let studentSchoolDAO: StudentSchoolDAO;
  let mockDBConnection: MockConnectionReturns;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentSchoolDAO,
        { provide: getConnectionToken(), useValue: mockConnectionValue() },
      ],
    }).compile();

    studentSchoolDAO = module.get<StudentSchoolDAO>(StudentSchoolDAO);
    mockDBConnection = module.get(getConnectionToken());
    jest.spyOn(cf, 'plainToClass').mockClear();
  });

  it('should be defined', () => {
    expect(studentSchoolDAO).toBeDefined();
  });

  it('findManyBySchoolId: when serve select arg', async () => {
    // value
    const input = { schoolId: 1, select: ['id'] };
    const getManyReturns = 'dataList';
    const expected = 'success';
    // when
    mockDBConnection.getMany.mockResolvedValue(getManyReturns);
    jest.spyOn(cf, 'plainToClass').mockReturnValue(expected);
    // then
    const result = await studentSchoolDAO.findManyBySchoolId(input);
    expect(mockDBConnection.createQueryBuilder).toHaveBeenCalledTimes(1);
    expect(mockDBConnection.from).toHaveBeenCalledTimes(1);
    expect(mockDBConnection.where).toHaveBeenCalledTimes(1);
    expect(mockDBConnection.select).toHaveBeenNthCalledWith(
      1,
      input.select.map((s) => `student_school.${s}`),
    );
    expect(mockDBConnection.getMany).toHaveBeenCalledTimes(1);
    expect(cf.plainToClass).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expected);
  });

  it('findManyBySchoolId: when do not serve select arg', async () => {
    // value
    const input = { schoolId: 1 };
    const getManyReturns = 'dataList';
    const expected = 'success';
    // when
    mockDBConnection.getMany.mockResolvedValue(getManyReturns);
    jest.spyOn(cf, 'plainToClass').mockReturnValue(expected);
    // then
    const result = await studentSchoolDAO.findManyBySchoolId(input);
    expect(mockDBConnection.createQueryBuilder).toHaveBeenCalledTimes(1);
    expect(mockDBConnection.from).toHaveBeenCalledTimes(1);
    expect(mockDBConnection.where).toHaveBeenCalledTimes(1);
    expect(mockDBConnection.select).toHaveBeenNthCalledWith(1, ['student_school']);
    expect(mockDBConnection.getMany).toHaveBeenCalledTimes(1);
    expect(cf.plainToClass).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expected);
  });
});
