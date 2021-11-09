import { Test, TestingModule } from '@nestjs/testing';
import * as cf from 'class-transformer';
import { StudentSchoolService } from '@app/src/student/application/service/student-school.service';
import { StudentRepository } from '@app/src/student/infra/student.repository';
import { StudentSchool } from '@app/src/student/domain/entity/student-school.entity';
import { Student } from '@app/src/student/domain/entity/student.entity';
import { MockRepositoryReturns, mockRepositoryValue } from '../../mock/value';
import { mockStudent, mockStudentSchool } from '../../mock/entity';
import { StudentSchoolValidator } from '@app/src/student/application/lib/student-school.validator';
import { BadRequestException } from '@nestjs/common';

describe('StudentSchoolService', () => {
  let studentSchoolService: StudentSchoolService;
  let mockStudentRepository: MockRepositoryReturns;
  let mockStudentSchoolValidator: Record<'ifNotSubscribedThrow', jest.Mock<any, any>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentSchoolService,
        { provide: StudentRepository, useValue: mockRepositoryValue() },
        { provide: StudentSchoolValidator, useValue: { ifNotSubscribedThrow: jest.fn() } },
      ],
    }).compile();

    studentSchoolService = module.get<StudentSchoolService>(StudentSchoolService);
    mockStudentRepository = module.get(StudentRepository);
    mockStudentSchoolValidator = module.get(StudentSchoolValidator);
  });

  it('should be defined', () => {
    expect(studentSchoolService).toBeDefined();
  });

  it('subscribe', async () => {
    // value
    const input = { student: mockStudent(), schoolId: 1 };
    const createStudentSchoolReturn = mockStudentSchool({ schoolId: input.schoolId });
    const subscribeSchoolReturn = mockStudentSchool({
      studentId: input.student.id,
      schoolId: input.schoolId,
    });
    const expected = 'success';
    // when
    jest.spyOn(StudentSchool, 'createStudentSchool').mockReturnValue(createStudentSchoolReturn);
    jest.spyOn(Student.prototype, 'subscribeSchool').mockReturnValue(subscribeSchoolReturn);
    jest.spyOn(cf, 'plainToClass').mockReturnValue(expected);
    // then
    const result = await studentSchoolService.subscribe(input.student, input.schoolId);
    expect(StudentSchool.createStudentSchool).toHaveBeenNthCalledWith(1, input.schoolId);
    expect(input.student.subscribeSchool).toHaveBeenNthCalledWith(1, createStudentSchoolReturn);
    expect(mockStudentRepository.save).toHaveBeenNthCalledWith(1, input.student);
    expect(cf.plainToClass).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expected);
  });

  it('unsubscribe: if school not subscribed is unsubscribe, throw BadRequestException', async () => {
    // value
    const input = { student: mockStudent(), schoolId: 1 };
    // when
    mockStudentSchoolValidator.ifNotSubscribedThrow.mockRejectedValueOnce(
      new BadRequestException(),
    );
    jest.spyOn(Student.prototype, 'unsubscribeSchool');
    // then
    try {
      await studentSchoolService.unsubscribe(input.student, input.schoolId);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
    } finally {
      expect(mockStudentSchoolValidator.ifNotSubscribedThrow).toHaveBeenNthCalledWith(1, {
        studentId: input.student.id,
        schoolId: input.schoolId,
      });
      expect(input.student.unsubscribeSchool).not.toHaveBeenCalled();
    }
  });

  it('unsubscribe: success', async () => {
    // value
    const input = { student: mockStudent(), schoolId: 1 };
    const expected = true;
    // when
    jest.spyOn(Student.prototype, 'unsubscribeSchool').mockImplementation(() => null);
    // then
    const result = await studentSchoolService.unsubscribe(input.student, input.schoolId);
    expect(mockStudentSchoolValidator.ifNotSubscribedThrow).toHaveBeenNthCalledWith(1, {
      studentId: input.student.id,
      schoolId: input.schoolId,
    });
    expect(input.student.unsubscribeSchool).toHaveBeenNthCalledWith(1, input.schoolId);
    expect(mockStudentRepository.save).toHaveBeenNthCalledWith(1, input.student);
    expect(result).toEqual(expected);
  });
});
