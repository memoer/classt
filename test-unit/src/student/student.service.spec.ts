import { Test, TestingModule } from '@nestjs/testing';
import * as cf from 'class-transformer';
import { StudentService } from '@app/src/student/application/service/student.service';
import { StudentValidator } from '@app/src/student/application/lib/student.validator';
import { StudentRepository } from '@app/src/student/infra/student.repository';
import { UtilHash, UtilJwt, UtilValidator } from '@app/util';
import { CreateStudentInput } from '@app/src/student/dto/create-student.in';
import { Gender, Student } from '@app/src/student/domain/entity/student.entity';
import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import {
  mockRepositoryValue,
  mockUtilHashValue,
  mockUtilJwtValue,
  mockUtilValidatorValue,
  MockRepositoryReturns,
  MockUtilHashReturns,
  MockUtilJwtReturns,
  MockUtilValidatorReturns,
} from '../../mock/function';
import { mockStudent } from '../../mock/entity';
import { UpdateStudentInput } from '@app/src/student/dto/update-student.in';

describe('StudentService', () => {
  let studentService: StudentService;
  let mockStudentRepository: MockRepositoryReturns;
  let mockUtilHash: MockUtilHashReturns;
  let mockUtilJwt: MockUtilJwtReturns;
  let mockUtilValidator: MockUtilValidatorReturns;
  let mockStudentValidator: Record<'ifNotDeletedThrow', jest.Mock<any, any>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        { provide: StudentRepository, useValue: mockRepositoryValue() },
        { provide: UtilHash, useValue: mockUtilHashValue() },
        { provide: UtilJwt, useValue: mockUtilJwtValue() },
        { provide: UtilValidator, useValue: mockUtilValidatorValue() },
        { provide: StudentValidator, useValue: { ifNotDeletedThrow: jest.fn() } },
      ],
    }).compile();

    studentService = module.get<StudentService>(StudentService);
    mockStudentRepository = module.get(StudentRepository);
    mockUtilHash = module.get(UtilHash);
    mockUtilJwt = module.get(UtilJwt);
    mockUtilValidator = module.get(UtilValidator);
    mockStudentValidator = module.get(StudentValidator);
    jest.spyOn(cf, 'plainToClass').mockClear();
  });

  it('should be defined', () => {
    expect(studentService).toBeDefined();
  });

  it('create', async () => {
    // value
    const input: CreateStudentInput = {
      email: 'student@naver.com',
      password: 'q1w2e3#',
      confirmPassword: 'q1w2e3#',
      name: 'student',
      gender: Gender.FEMALE,
      birthDate: new Date(),
    };
    const hashReturn = 'hash';
    const createReturn = 'create';
    const saveReturn = { id: 10 };
    const expected = { data: 'data', token: 'token' };
    // when
    mockUtilHash.genHash.mockResolvedValue(hashReturn);
    mockStudentRepository.create.mockReturnValue(createReturn);
    mockStudentRepository.save.mockResolvedValue(saveReturn);
    jest.spyOn(cf, 'plainToClass').mockReturnValue(expected.data);
    mockUtilJwt.sign.mockReturnValue(expected.token);
    // then
    const result = await studentService.create(input);
    expect(mockUtilHash.genHash).toHaveBeenNthCalledWith(1, input.password);
    expect(mockStudentRepository.create).toHaveBeenNthCalledWith(1, {
      ...input,
      password: hashReturn,
      confirmPassword: undefined,
    });
    expect(mockStudentRepository.save).toHaveBeenNthCalledWith(1, createReturn);
    expect(cf.plainToClass).toHaveBeenCalledTimes(1);
    expect(mockUtilJwt.sign).toHaveBeenNthCalledWith(1, saveReturn.id);
    expect(result).toEqual(expected);
  });

  it('delete: if wrong password, throw ForbiddenExpcetion', async () => {
    // value
    const student = mockStudent();
    const plainPassword = '123';
    // when
    mockUtilValidator.ifWrongPasswordThrow.mockRejectedValueOnce(new ForbiddenException());
    // then
    try {
      await studentService.delete(student, plainPassword);
    } catch (error) {
      expect(error).toBeInstanceOf(ForbiddenException);
    } finally {
      expect(mockUtilValidator.ifWrongPasswordThrow).toHaveBeenNthCalledWith(1, {
        plainPassword,
        hashPassword: student.password,
      });
      expect(mockStudentRepository.softDelete).not.toHaveBeenCalled();
    }
  });

  it('delete: success', async () => {
    // value
    const student = mockStudent();
    const plainPassword = '123';
    // when
    mockStudentRepository.softDelete.mockResolvedValue({ affected: 1 });
    // then
    const result = await studentService.delete(student, plainPassword);
    expect(mockUtilValidator.ifWrongPasswordThrow).toHaveBeenNthCalledWith(1, {
      plainPassword,
      hashPassword: student.password,
    });
    expect(mockStudentRepository.softDelete).toHaveBeenNthCalledWith(1, student.id);
    expect(result).toEqual(true);
  });

  it('update: if password served but confirm password not, throw BadRequestException', async () => {
    // vaeue
    const student = mockStudent();
    const input: UpdateStudentInput = {
      email: 'student@google.com',
      password: 'q1w2e3r4#',
      name: 'student',
      gender: Gender.FEMALE,
      birthDate: new Date(),
    };
    // when
    mockUtilValidator.ifThereIsPasswordButWithoutConfirmPasswordThrow.mockImplementationOnce(() => {
      throw new BadRequestException();
    });
    // then
    try {
      await studentService.update(student, input);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
    } finally {
      expect(
        mockUtilValidator.ifThereIsPasswordButWithoutConfirmPasswordThrow,
      ).toHaveBeenCalledTimes(1);
      expect(mockUtilHash.genHash).not.toHaveBeenCalled();
    }
  });

  it('update: success', async () => {
    // vaeue
    const student = mockStudent();
    const input: UpdateStudentInput = {
      email: 'student@google.com',
      password: 'q1w2e3r4#',
      name: 'student',
      gender: Gender.FEMALE,
      birthDate: new Date(),
    };
    const genHashReturn = 'hash';
    const expected = 'success';
    // when
    mockUtilHash.genHash.mockResolvedValue(genHashReturn);
    jest.spyOn(Student.prototype, 'update');
    jest.spyOn(cf, 'plainToClass').mockReturnValue(expected);
    // then
    const result = await studentService.update(student, input);
    expect(mockUtilValidator.ifThereIsPasswordButWithoutConfirmPasswordThrow).toHaveBeenCalledTimes(
      1,
    );
    expect(mockUtilHash.genHash).toHaveBeenNthCalledWith(1, input.password);
    expect(student.update).toHaveBeenNthCalledWith(1, {
      email: input.email,
      name: input.name,
      gender: input.gender,
      birthDate: input.birthDate,
    });
    expect(mockStudentRepository.save).toHaveBeenNthCalledWith(1, {
      ...student,
      password: genHashReturn,
    });
    expect(cf.plainToClass).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expected);
  });

  it('restore: if student is exists, throw NotFoundException', async () => {
    // value
    // when
    mockStudentRepository.findOne.mockResolvedValue(undefined);
    mockUtilValidator.ifNotFoundThrow.mockImplementationOnce(() => {
      throw new NotFoundException();
    });
    // then
    try {
      await studentService.restore({ id: 1, password: 'q1w2e3' });
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    } finally {
      expect(mockStudentRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockUtilValidator.ifNotFoundThrow).toHaveBeenCalledTimes(1);
      expect(mockStudentValidator.ifNotDeletedThrow).not.toHaveBeenCalled();
    }
  });

  it('restore: if student is not deleted, throw BadRequestException', async () => {
    // value
    const student = mockStudent();
    student.deletedAt = new Date();
    // when
    mockStudentRepository.findOne.mockResolvedValue(student);
    mockStudentValidator.ifNotDeletedThrow.mockImplementationOnce(() => {
      throw new BadRequestException();
    });
    // then
    try {
      await studentService.restore({ id: 1, password: 'q1w2e3' });
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
    } finally {
      expect(mockStudentRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockUtilValidator.ifNotFoundThrow).toHaveBeenCalledTimes(1);
      expect(mockStudentValidator.ifNotDeletedThrow).toHaveBeenNthCalledWith(1, student);
      expect(mockUtilValidator.ifWrongPasswordThrow).not.toHaveBeenCalled();
    }
  });

  it('restore: if enter wrong password, throw ForbiddenException', async () => {
    // value
    const student = mockStudent();
    student.deletedAt = new Date();
    const input = { id: 1, password: 'q1w2e3' };
    // when
    mockStudentRepository.findOne.mockResolvedValue(student);
    mockUtilValidator.ifWrongPasswordThrow.mockImplementationOnce(() => {
      throw new ForbiddenException();
    });
    // then
    try {
      await studentService.restore(input);
    } catch (error) {
      expect(error).toBeInstanceOf(ForbiddenException);
    } finally {
      expect(mockStudentRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockUtilValidator.ifNotFoundThrow).toHaveBeenCalledTimes(1);
      expect(mockStudentValidator.ifNotDeletedThrow).toHaveBeenNthCalledWith(1, student);
      expect(mockUtilValidator.ifWrongPasswordThrow).toHaveBeenNthCalledWith(1, {
        plainPassword: input.password,
        hashPassword: student.password,
      });
      expect(mockStudentRepository.restore).not.toHaveBeenCalled();
    }
  });

  it('restore: success', async () => {
    // value
    const student = mockStudent();
    student.deletedAt = new Date();
    const input = { id: 1, password: 'q1w2e3' };
    // when
    mockStudentRepository.findOne.mockResolvedValue(student);
    mockStudentRepository.restore.mockResolvedValue({ affected: 1 });
    // then
    const result = await studentService.restore(input);
    expect(mockStudentRepository.findOne).toHaveBeenCalledTimes(1);
    expect(mockUtilValidator.ifNotFoundThrow).toHaveBeenCalledTimes(1);
    expect(mockStudentValidator.ifNotDeletedThrow).toHaveBeenNthCalledWith(1, student);
    expect(mockUtilValidator.ifWrongPasswordThrow).toHaveBeenNthCalledWith(1, {
      plainPassword: input.password,
      hashPassword: student.password,
    });
    expect(mockStudentRepository.restore).toHaveBeenNthCalledWith(1, input.id);
    expect(result).toEqual(true);
  });
});
