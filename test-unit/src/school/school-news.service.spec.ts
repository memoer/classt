import { Test, TestingModule } from '@nestjs/testing';
import * as cf from 'class-transformer';
import { SchoolNewsService } from '@app/src/school/application/service/school-news.service';
import { SchoolHelper } from '@app/src/school/application/lib/school.helper';
import { SchoolNewsHelper } from '@app/src/school/application/lib/school-news.helper';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SchoolNewsRepository } from '@app/src/school/infra/school-news.repository';
import { SchoolRepository } from '@app/src/school/infra/school.repository';
import { UtilValidator } from '@app/util';
import { CreateSchoolNewsInput } from '@app/src/school/dto/create-school-news.in';
import { NotFoundException } from '@nestjs/common';
import { SchoolNews } from '@app/src/school/domain/entity/school-news.entity';
import { School } from '@app/src/school/domain/entity/school.entity';
import { SchoolNewsEvent } from '@app/src/school/infra/school-news.event';
import { SchoolNewsCreatedEvent } from '@app/src/school/dto/school-news-created-event.in';
import {
  mockEventEmitterValue,
  MockEventEmitterReturns,
  MockRepositoryReturns,
  mockRepositoryValue,
  MockUtilValidatorReturns,
  mockUtilValidatorValue,
} from '../../mock/value';
import { mockSchool, mockSchoolNews } from '../../mock/entity';
import { UpdateSchoolNewsInput } from '@app/src/school/dto/update-school.news.in';

describe('SchoolNewsService', () => {
  let schoolNewsService: SchoolNewsService;
  let mockSchoolRepository: MockRepositoryReturns;
  let mockSchoolHelper: Record<'findOneOrFail', jest.Mock<any, any>>;
  let mockSchoolNewsRepository: MockRepositoryReturns;
  let mockSchoolNewsHelper: Record<'findOneOrFail', jest.Mock<any, any>>;
  let mockUtilValidator: MockUtilValidatorReturns;
  let mockEventEmitter2: MockEventEmitterReturns;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchoolNewsService,
        { provide: SchoolRepository, useValue: mockRepositoryValue() },
        { provide: SchoolHelper, useValue: { findOneOrFail: jest.fn() } },
        { provide: SchoolNewsRepository, useValue: mockRepositoryValue() },
        { provide: SchoolNewsHelper, useValue: { findOneOrFail: jest.fn() } },
        { provide: UtilValidator, useValue: mockUtilValidatorValue() },
        { provide: EventEmitter2, useValue: mockEventEmitterValue() },
      ],
    }).compile();

    schoolNewsService = module.get<SchoolNewsService>(SchoolNewsService);
    mockSchoolRepository = module.get(SchoolRepository);
    mockSchoolHelper = module.get(SchoolHelper);
    mockSchoolNewsRepository = module.get(SchoolNewsRepository);
    mockSchoolNewsHelper = module.get(SchoolNewsHelper);
    mockUtilValidator = module.get(UtilValidator);
    mockEventEmitter2 = module.get(EventEmitter2);
    jest.spyOn(cf, 'plainToClass').mockClear();
  });

  it('should be defined', () => {
    expect(schoolNewsService).toBeDefined();
  });

  it('create: if school not found, throw NotFoundException', async () => {
    // value
    const input: CreateSchoolNewsInput = { schoolId: 65, information: 'mock information' };
    // when
    mockSchoolHelper.findOneOrFail.mockImplementationOnce(() => {
      throw new NotFoundException();
    });
    jest.spyOn(SchoolNews, 'createSchoolNews');
    // then
    try {
      await schoolNewsService.create(input);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    } finally {
      expect(mockSchoolHelper.findOneOrFail).toHaveBeenNthCalledWith(1, input.schoolId, {
        relations: ['schoolNewsList'],
      });
      expect(SchoolNews.createSchoolNews).not.toHaveBeenCalled();
    }
  });
  it('create: success', async () => {
    // value
    const input: CreateSchoolNewsInput = { schoolId: 65, information: 'mock information' };
    const school = mockSchool();
    const schoolNews = mockSchoolNews(school);
    const expected = 'SchoolNewsModel';
    // when
    mockSchoolHelper.findOneOrFail.mockResolvedValue(school);
    jest.spyOn(SchoolNews, 'createSchoolNews').mockReturnValue(schoolNews);
    jest.spyOn(School.prototype, 'addNews').mockImplementationOnce(() => null);
    jest.spyOn(cf, 'plainToClass').mockReturnValue(expected);
    // then
    const result = await schoolNewsService.create(input);
    expect(mockSchoolHelper.findOneOrFail).toHaveBeenNthCalledWith(1, input.schoolId, {
      relations: ['schoolNewsList'],
    });
    expect(SchoolNews.createSchoolNews).toHaveBeenNthCalledWith(1, {
      information: input.information,
    });
    expect(school.addNews).toHaveBeenNthCalledWith(1, schoolNews);
    expect(mockSchoolRepository.save).toHaveBeenNthCalledWith(1, school);
    expect(mockEventEmitter2.emit).toHaveBeenNthCalledWith(
      1,
      SchoolNewsEvent.CREATED,
      new SchoolNewsCreatedEvent({ schoolId: school.id, schoolNewsId: schoolNews.id }),
    );
    expect(cf.plainToClass).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expected);
  });
  it('delete: if school new not found, throw NotFoundException', async () => {
    // value
    const id = 3;
    // when
    mockUtilValidator.ifNotFoundThrow.mockImplementationOnce(() => {
      throw new NotFoundException();
    });
    // then
    try {
      await schoolNewsService.delete(id);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    } finally {
      expect(mockSchoolNewsRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockUtilValidator.ifNotFoundThrow).toHaveBeenCalledTimes(1);
      expect(mockSchoolNewsRepository.softDelete).not.toHaveBeenCalled();
    }
  });
  it('delete: success', async () => {
    // value
    const id = 3;
    // when
    mockSchoolNewsRepository.softDelete.mockResolvedValue({ affected: 1 });
    // then
    const result = await schoolNewsService.delete(id);
    expect(mockSchoolNewsRepository.findOne).toHaveBeenCalledTimes(1);
    expect(mockUtilValidator.ifNotFoundThrow).toHaveBeenCalledTimes(1);
    expect(mockSchoolNewsRepository.softDelete).toHaveBeenNthCalledWith(1, id);
    expect(result).toEqual(true);
  });
  it('update: if school news not found, throw NotFoundException', async () => {
    // value
    const input: UpdateSchoolNewsInput = { id: 56, information: 'test information' };
    const schoolNews = mockSchoolNews(mockSchool(input.id));
    // when
    mockSchoolNewsHelper.findOneOrFail.mockRejectedValueOnce(new NotFoundException());
    jest.spyOn(SchoolNews.prototype, 'update');
    // then
    try {
      await schoolNewsService.update(input);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    } finally {
      expect(mockSchoolNewsHelper.findOneOrFail).toHaveBeenNthCalledWith(1, input.id);
      expect(schoolNews.update).not.toHaveBeenCalled();
    }
  });
  it('update: success', async () => {
    // value
    const input: UpdateSchoolNewsInput = { id: 56, information: 'test information' };
    const schoolNews = mockSchoolNews(mockSchool(input.id));
    const expected = 'SchoolNewsModel';
    // when
    mockSchoolNewsHelper.findOneOrFail.mockResolvedValueOnce(schoolNews);
    jest.spyOn(SchoolNews.prototype, 'update');
    jest.spyOn(cf, 'plainToClass').mockReturnValue(expected);
    // then
    const result = await schoolNewsService.update(input);
    expect(mockSchoolNewsHelper.findOneOrFail).toHaveBeenNthCalledWith(1, input.id);
    expect(schoolNews.update).toHaveBeenNthCalledWith(1, { information: input.information });
    expect(mockSchoolNewsRepository.save).toHaveBeenNthCalledWith(1, schoolNews);
    expect(cf.plainToClass).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expected);
  });
  it('restore', async () => {
    // value
    const id = 2;
    const schoolNews = mockSchoolNews(mockSchool(id));
    const expected = 'SchoolNewsModel';
    // when
    jest.spyOn(cf, 'plainToClass').mockReturnValue(expected);
    mockSchoolNewsRepository.findOneOrFail.mockResolvedValue(schoolNews);
    // then
    const result = await schoolNewsService.restore(id);
    expect(mockSchoolNewsRepository.findOneOrFail).toHaveBeenNthCalledWith(1, id, {
      withDeleted: true,
    });
    expect(mockSchoolNewsRepository.recover).toHaveBeenNthCalledWith(1, schoolNews);
    expect(cf.plainToClass).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expected);
  });
});
