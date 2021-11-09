import { Test, TestingModule } from '@nestjs/testing';
import { StudentValidator } from '@app/src/student/application/lib/student.validator';
import { UtilCommon } from '@app/util';
import { MockUtilCommonReturns, mockUtilCommonValue } from '../../mock/value';
import { Student } from '@app/src/student/domain/entity/student.entity';
import { BadRequestException } from '@nestjs/common';
import { mockStudent } from '../../mock/entity';

describe('StudentValidator', () => {
  let studentValidator: StudentValidator;
  let mockUtilCommon: MockUtilCommonReturns;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentValidator, { provide: UtilCommon, useValue: mockUtilCommonValue() }],
    }).compile();

    studentValidator = module.get<StudentValidator>(StudentValidator);
    mockUtilCommon = module.get(UtilCommon);
  });

  it('should be defined', () => {
    expect(studentValidator).toBeDefined();
  });

  it('ifNotDeletedThrow: if student is deleted, throw BadRequestException', () => {
    // value
    const student = mockStudent();
    // when
    jest.spyOn(Student.prototype, 'isDeleted').mockReturnValue(false);
    mockUtilCommon.exception.mockReturnValue(new BadRequestException());
    // then
    try {
      studentValidator.ifNotDeletedThrow(student);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
    } finally {
      expect(mockUtilCommon.exception).toHaveBeenCalledTimes(1);
    }
  });

  it('ifNotDeletedThrow: if student is not deleted, do not throw BadRequestException', () => {
    // value
    const student = mockStudent();
    // when
    jest.spyOn(Student.prototype, 'isDeleted').mockReturnValue(true);
    // then
    studentValidator.ifNotDeletedThrow(student);
    expect(mockUtilCommon.exception).not.toHaveBeenCalled();
  });
});
