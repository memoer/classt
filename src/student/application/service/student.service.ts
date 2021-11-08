import { UtilHash } from '@app/util';
import { GetTokenInput } from '@app/util/dto/get-token.in';
import { UtilJwt } from '@app/util/util-jwt';
import { UtilValidator } from '@app/util/util-validator';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { Student } from '../../domain/entity/student.entity';
import { CreateStudentInput } from '../../dto/create-student.in';
import { DeleteStudentArgs } from '../../dto/delete-student.in';
import { RestoreStudentInput } from '../../dto/restore-student.in';
import { StudentModel } from '../../dto/student.model';
import { UpdateStudentInput } from '../../dto/update-student.in';
import { StudentRepository } from '../../infra/student.repository';
import { StudentMutationResolver } from '../../resolver/student-mutation.resolver';
import { StudentValidator } from '../lib/student.validator';

@Injectable()
export class StudentService {
  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly utilHash: UtilHash,
    private readonly utilJwt: UtilJwt,
    private readonly utilValidator: UtilValidator,
    private readonly studentValidator: StudentValidator,
  ) {}

  @Transactional()
  async create({
    email,
    password,
    name,
    gender,
    birthDate,
  }: CreateStudentInput): ReturnType<StudentMutationResolver['create']> {
    const newStudentEntity = this.studentRepository.create({
      email,
      password: await this.utilHash.genHash(password),
      name,
      gender,
      birthDate,
    });
    const newStudent = await this.studentRepository.save(newStudentEntity);
    return {
      data: plainToClass(StudentModel, newStudent),
      token: this.utilJwt.sign(newStudent.id),
    };
  }

  @Transactional()
  async delete(
    student: Student,
    plainPassword: DeleteStudentArgs['password'],
  ): ReturnType<StudentMutationResolver['delete']> {
    await this.utilValidator.ifWrongPasswordThrow({
      plainPassword,
      hashPassword: student.password,
    });
    const result = await this.studentRepository.softDelete(student.id);
    return result.affected === 1;
  }

  @Transactional()
  async update(
    student: Student,
    { email, password, confirmPassword, name, gender, birthDate }: UpdateStudentInput,
  ): ReturnType<StudentMutationResolver['update']> {
    if (password) {
      this.utilValidator.ifThereIsPasswordButWithoutConfirmPasswordThrow(confirmPassword);
      student.password = await this.utilHash.genHash(password);
    }
    student.update({ email, name, gender, birthDate });
    await this.studentRepository.save(student);
    return plainToClass(StudentModel, student);
  }

  async getToken({ email, password }: GetTokenInput): ReturnType<UtilJwt['getToken']> {
    return this.utilJwt.getToken(this.studentRepository, {
      email,
      password,
      errorMsg: `${email}/존재하지 않는 학생입니다.`,
    });
  }

  @Transactional()
  async restore({
    id,
    password,
  }: RestoreStudentInput): ReturnType<StudentMutationResolver['restore']> {
    const student = await this.studentRepository.findOne({
      select: ['id', 'deletedAt', 'password'],
      where: { id },
      withDeleted: true,
    });
    this.utilValidator.ifNotFoundThrow({
      entity: student,
      errorMsg: `${id}/존재하지 않는 학생입니다.`,
    });
    this.studentValidator.ifNotDeletedThrow(student);
    await this.utilValidator.ifWrongPasswordThrow({
      plainPassword: password,
      hashPassword: student.password,
    });
    const result = await this.studentRepository.restore(id);
    return result.affected === 1;
  }
}
