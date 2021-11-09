import { Test, TestingModule } from '@nestjs/testing';
import { SchoolValidator } from '@app/src/school/application/lib/school.validator';
import { SchoolRepository } from '@app/src/school/infra/school.repository';
import { UtilCommon } from '@app/util';
import {
  MockRepositoryReturns,
  mockRepositoryValue,
  MockUtilCommonReturns,
  mockUtilCommonValue,
} from '../../mock/function';
import { CreateSchoolInput } from '@app/src/school/dto/create-school.in';
import { ConflictException } from '@nestjs/common';

describe('SchoolValidator', () => {
  let schoolValidator: SchoolValidator;
  let mockSchoolRepository: MockRepositoryReturns;
  let mockUtilCommon: MockUtilCommonReturns;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchoolValidator,
        { provide: SchoolRepository, useValue: mockRepositoryValue() },
        { provide: UtilCommon, useValue: mockUtilCommonValue() },
      ],
    }).compile();

    schoolValidator = module.get<SchoolValidator>(SchoolValidator);
    mockSchoolRepository = module.get(SchoolRepository);
    mockUtilCommon = module.get(UtilCommon);
  });

  it('should be defined', () => {
    expect(schoolValidator).toBeDefined();
  });

  it('ifAlreadyExistThrow: if already exist, ConfliectException throw', async () => {
    // value
    const input: CreateSchoolInput = { location: 'location', name: 'name' };
    // when
    mockSchoolRepository.findOne.mockResolvedValue(true);
    mockUtilCommon.exception.mockImplementationOnce(() => {
      throw new ConflictException();
    });
    // then
    try {
      await schoolValidator.ifAlreadyExistThrow(input);
    } catch (error) {
      expect(error).toBeInstanceOf(ConflictException);
    } finally {
      expect(mockSchoolRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockUtilCommon.exception).toHaveBeenCalledTimes(1);
    }
  });

  it('ifAlreadyExistThrow: if not exists, nothing happens', async () => {
    // value
    const input: CreateSchoolInput = { location: 'location', name: 'name' };
    // when
    mockSchoolRepository.findOne.mockResolvedValue(false);
    // then
    await schoolValidator.ifAlreadyExistThrow(input);
    expect(mockSchoolRepository.findOne).toHaveBeenCalledTimes(1);
    expect(mockUtilCommon.exception).not.toHaveBeenCalled();
  });
});
