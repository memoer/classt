import { Test, TestingModule } from '@nestjs/testing';
import { UtilCommon } from '@app/util';
import { MockUtilCommonReturns, mockUtilCommonValue } from '../../mock/value';
import { StudentSchoolValidator } from '@app/src/student/application/lib/student-school.validator';
import { StudentSchoolDAO } from '@app/src/student/infra/student-school.dao';
import { IfNotSubscribedThrowArgs } from '@app/src/student/dto/student-school-validator.dto';
import { BadRequestException } from '@nestjs/common';

describe('StudentSchoolValidator', () => {
  let studentSchoolValidator: StudentSchoolValidator;
  let mockUtilCommon: MockUtilCommonReturns;
  let mockStudentSchoolDAO: Record<'findOne', jest.Mock<any, any>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentSchoolValidator,
        { provide: UtilCommon, useValue: mockUtilCommonValue() },
        { provide: StudentSchoolDAO, useValue: { findOne: jest.fn() } },
      ],
    }).compile();

    studentSchoolValidator = module.get<StudentSchoolValidator>(StudentSchoolValidator);
    mockUtilCommon = module.get(UtilCommon);
    mockStudentSchoolDAO = module.get(StudentSchoolDAO);
  });

  it('should be defined', () => {
    expect(studentSchoolValidator).toBeDefined();
  });

  it('if not subscrbied, throw BadRequestException', async () => {
    // value
    const input: IfNotSubscribedThrowArgs = { studentId: 3, schoolId: 9 };
    // when
    mockStudentSchoolDAO.findOne.mockResolvedValue(false);
    mockUtilCommon.exception.mockReturnValue(new BadRequestException());
    // then
    try {
      await studentSchoolValidator.ifNotSubscribedThrow(input);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
    } finally {
      expect(mockStudentSchoolDAO.findOne).toHaveBeenNthCalledWith(1, input);
      expect(mockUtilCommon.exception).toHaveBeenCalledTimes(1);
    }
  });

  it('if subscrbied, nothing happens', async () => {
    // value
    const input: IfNotSubscribedThrowArgs = { studentId: 3, schoolId: 9 };
    // when
    mockStudentSchoolDAO.findOne.mockResolvedValue(true);
    // then
    await studentSchoolValidator.ifNotSubscribedThrow(input);
    expect(mockStudentSchoolDAO.findOne).toHaveBeenNthCalledWith(1, input);
    expect(mockUtilCommon.exception).not.toHaveBeenCalled();
  });
});
