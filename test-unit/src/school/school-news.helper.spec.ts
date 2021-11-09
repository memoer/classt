import { Test, TestingModule } from '@nestjs/testing';
import { SchoolNewsHelper } from '@app/src/school/application/lib/school-news.helper';
import { SchoolNewsRepository } from '@app/src/school/infra/school-news.repository';
import { UtilValidator } from '@app/util';
import {
  MockRepositoryReturns,
  mockRepositoryValue,
  MockUtilValidatorReturns,
  mockUtilValidatorValue,
} from '../../mock/function';
import { NotFoundException } from '@nestjs/common';

describe('SchoolNewsHelper', () => {
  let schoolNewsHelper: SchoolNewsHelper;
  let mockSchoolNewsRepository: MockRepositoryReturns;
  let mockUtilValidator: MockUtilValidatorReturns;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchoolNewsHelper,
        { provide: SchoolNewsRepository, useValue: mockRepositoryValue() },
        { provide: UtilValidator, useValue: mockUtilValidatorValue() },
      ],
    }).compile();

    schoolNewsHelper = module.get<SchoolNewsHelper>(SchoolNewsHelper);
    mockSchoolNewsRepository = module.get(SchoolNewsRepository);
    mockUtilValidator = module.get(UtilValidator);
  });

  it('should be defined', () => {
    expect(schoolNewsHelper).toBeDefined();
  });

  it('findOneOrFail: if schoolNews not found, throw NotFoundException', async () => {
    // value
    const id = 29;
    // when
    mockUtilValidator.ifNotFoundThrow.mockImplementationOnce(() => {
      throw new NotFoundException();
    });
    // then
    try {
      await schoolNewsHelper.findOneOrFail(id);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    } finally {
      expect(mockSchoolNewsRepository.findOne).toHaveBeenNthCalledWith(1, id);
      expect(mockUtilValidator.ifNotFoundThrow).toHaveBeenCalledTimes(1);
    }
  });

  it('findOneOrFail: success', async () => {
    // value
    const id = 29;
    const expected = 'success';
    // when
    mockSchoolNewsRepository.findOne.mockResolvedValue(expected);
    // then
    const result = await schoolNewsHelper.findOneOrFail(id);
    expect(mockSchoolNewsRepository.findOne).toHaveBeenNthCalledWith(1, id);
    expect(mockUtilValidator.ifNotFoundThrow).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expected);
  });
});
