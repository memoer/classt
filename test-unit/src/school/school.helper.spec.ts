import { Test, TestingModule } from '@nestjs/testing';
import { SchoolHelper } from '@app/src/school/application/lib/school.helper';
import { SchoolRepository } from '@app/src/school/infra/school.repository';
import { UtilValidator } from '@app/util';
import {
  MockRepositoryReturns,
  mockRepositoryValue,
  MockUtilValidatorReturns,
  mockUtilValidatorValue,
} from '../../mock/function';
import { NotFoundException } from '@nestjs/common';
import { FindOneOptions } from 'typeorm';
import { School } from '@app/src/school/domain/entity/school.entity';

describe('SchoolHelper', () => {
  let schoolHelper: SchoolHelper;
  let mockSchoolRepository: MockRepositoryReturns;
  let mockUtilValidator: MockUtilValidatorReturns;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchoolHelper,
        { provide: SchoolRepository, useValue: mockRepositoryValue() },
        { provide: UtilValidator, useValue: mockUtilValidatorValue() },
      ],
    }).compile();

    schoolHelper = module.get<SchoolHelper>(SchoolHelper);
    mockSchoolRepository = module.get(SchoolRepository);
    mockUtilValidator = module.get(UtilValidator);
  });

  it('should be defined', () => {
    expect(schoolHelper).toBeDefined();
  });

  it('findOneOrFail: if school not found, throw NotFoundException', async () => {
    // value
    const id = 19;
    // when
    mockUtilValidator.ifNotFoundThrow.mockImplementationOnce(() => {
      throw new NotFoundException();
    });
    // then
    try {
      await schoolHelper.findOneOrFail(id);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    } finally {
      expect(mockSchoolRepository.findOne).toHaveBeenNthCalledWith(1, id, undefined);
      expect(mockUtilValidator.ifNotFoundThrow).toHaveBeenCalledTimes(1);
    }
  });

  it('findOneOrFail: success', async () => {
    // value
    const id = 19;
    const opts: FindOneOptions<School> = { select: ['id', 'createdAt', 'name'] };
    const expected = 'success';
    // when
    mockSchoolRepository.findOne.mockResolvedValue(expected);
    // then
    const result = await schoolHelper.findOneOrFail(id, opts);
    expect(mockSchoolRepository.findOne).toHaveBeenNthCalledWith(1, id, opts);
    expect(mockUtilValidator.ifNotFoundThrow).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expected);
  });
});
