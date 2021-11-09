import { Test, TestingModule } from '@nestjs/testing';
import * as cf from 'class-transformer';
import { SchoolService } from '@app/src/school/application/service/school.service';
import { SchoolHelper } from '@app/src/school/application/lib/school.helper';
import { SchoolValidator } from '@app/src/school/application/lib/school.validator';
import { SchoolRepository } from '@app/src/school/infra/school.repository';
import { UtilValidator } from '@app/util';
import {
  MockRepositoryReturns,
  mockRepositoryValue,
  MockUtilValidatorReturns,
  mockUtilValidatorValue,
} from '../../mock/value';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { CreateSchoolInput } from '@app/src/school/dto/create-school.in';
import { UpdateSchoolInput } from '@app/src/school/dto/update-school.in';
import { School } from '@app/src/school/domain/entity/school.entity';
import { mockSchool } from '../../mock/entity';

describe('SchoolService', () => {
  let schoolService: SchoolService;
  let mockSchoolRepository: MockRepositoryReturns;
  let mockSchoolHelper: Record<'findOneOrFail', jest.Mock<any, any>>;
  let mockUtilValidator: MockUtilValidatorReturns;
  let mockSchoolValidator: Record<'ifAlreadyExistThrow', jest.Mock<any, any>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchoolService,
        { provide: SchoolRepository, useValue: mockRepositoryValue() },
        { provide: SchoolHelper, useValue: { findOneOrFail: jest.fn() } },
        { provide: UtilValidator, useValue: mockUtilValidatorValue() },
        { provide: SchoolValidator, useValue: { ifAlreadyExistThrow: jest.fn() } },
      ],
    }).compile();

    schoolService = module.get<SchoolService>(SchoolService);
    mockSchoolRepository = module.get(SchoolRepository);
    mockSchoolHelper = module.get(SchoolHelper);
    mockUtilValidator = module.get(UtilValidator);
    mockSchoolValidator = module.get(SchoolValidator);
    jest.spyOn(cf, 'plainToClass').mockClear();
  });

  it('should be defined', () => {
    expect(schoolService).toBeDefined();
  });

  it('create: if already exist, throw ConflictException', async () => {
    // value
    const input: CreateSchoolInput = { location: 'location', name: 'name' };
    // when
    mockSchoolValidator.ifAlreadyExistThrow.mockImplementationOnce(() => {
      throw new ConflictException();
    });
    // then
    try {
      await schoolService.create(input);
    } catch (error) {
      expect(error).toBeInstanceOf(ConflictException);
    } finally {
      expect(mockSchoolValidator.ifAlreadyExistThrow).toHaveBeenCalledTimes(1);
      expect(mockSchoolRepository.create).not.toHaveBeenCalled();
    }
  });
  it('create: success', async () => {
    // value
    const input: CreateSchoolInput = { location: 'location', name: 'name' };
    const createReturn = 'create';
    const saveReturn = 'save';
    const expected = 'SchoolModel';
    // when
    mockSchoolRepository.create.mockReturnValue(createReturn);
    mockSchoolRepository.save.mockResolvedValue(saveReturn);
    jest.spyOn(cf, 'plainToClass').mockReturnValue(expected);
    // then
    const result = await schoolService.create(input);
    expect(mockSchoolValidator.ifAlreadyExistThrow).toHaveBeenCalledTimes(1);
    expect(mockSchoolRepository.create).toHaveBeenNthCalledWith(1, input);
    expect(mockSchoolRepository.save).toHaveBeenNthCalledWith(1, createReturn);
    expect(cf.plainToClass).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expected);
  });
  it('delete: if school not exists, throw NotFoundException', async () => {
    // value
    const id = 23;
    // when
    mockUtilValidator.ifNotFoundThrow.mockImplementationOnce(() => {
      throw new NotFoundException();
    });
    // then
    try {
      await schoolService.delete(id);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    } finally {
      expect(mockSchoolRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockUtilValidator.ifNotFoundThrow).toHaveBeenCalledTimes(1);
      expect(mockSchoolRepository.softDelete).not.toHaveBeenCalled();
    }
  });
  it('delete: success', async () => {
    // value
    const id = 23;
    // when
    mockSchoolRepository.softDelete.mockResolvedValue({ affected: 1 });
    // then
    const result = await schoolService.delete(id);
    expect(mockSchoolRepository.findOne).toHaveBeenCalledTimes(1);
    expect(mockUtilValidator.ifNotFoundThrow).toHaveBeenCalledTimes(1);
    expect(mockSchoolRepository.softDelete).toHaveBeenNthCalledWith(1, id);
    expect(result).toEqual(true);
  });
  it('update', async () => {
    // value
    const input: UpdateSchoolInput = { id: 84, location: 'location', name: 'name' };
    const school = mockSchool();
    const expected = 'SchoolModel';
    // when
    jest.spyOn(School.prototype, 'update');
    mockSchoolHelper.findOneOrFail.mockResolvedValue(school);
    jest.spyOn(cf, 'plainToClass').mockReturnValue(expected);
    // then
    const result = await schoolService.update(input);
    expect(mockSchoolHelper.findOneOrFail).toHaveBeenNthCalledWith(1, input.id);
    expect(school.update).toHaveBeenNthCalledWith(1, {
      location: input.location,
      name: input.name,
    });
    expect(mockSchoolRepository.save).toHaveBeenNthCalledWith(1, school);
    expect(result).toEqual(expected);
  });
  it('restore', async () => {
    // value
    const id = 2;
    const school = mockSchool();
    const expected = 'SchoolModel';
    // when
    jest.spyOn(cf, 'plainToClass').mockReturnValue(expected);
    mockSchoolRepository.findOneOrFail.mockResolvedValue(school);
    // then
    const result = await schoolService.restore(id);
    expect(mockSchoolRepository.findOneOrFail).toHaveBeenNthCalledWith(1, id, {
      withDeleted: true,
    });
    expect(mockSchoolRepository.recover).toHaveBeenNthCalledWith(1, school);
    expect(cf.plainToClass).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expected);
  });
});
