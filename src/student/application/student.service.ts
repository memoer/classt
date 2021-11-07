import { UtilHash, UtilHelper } from '@app/util';
import { GetTokenInput } from '@app/util/dto/get-token.in';
import { UtilJwt } from '@app/util/util-jwt';
import { UtilValidator } from '@app/util/util-validator';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { Student } from '../domain/entity/student.entity';
import { CreateStudentInput } from '../dto/create-student.in';
import { DeleteStudentArgs } from '../dto/delete-student.in';
import { StudentModel } from '../dto/student.model';
import { UpdateStudentInput } from '../dto/update-student.in';
import { StudentRepository } from '../infra/student.repository';
import { StudentMutationResolver } from '../resolver/student-mutation.resolver';

@Injectable()
export class StudentService {
  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly utilHash: UtilHash,
    private readonly utilJwt: UtilJwt,
    private readonly utilValidator: UtilValidator,
    private readonly utilHepler: UtilHelper,
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
    user: Student,
    plainPassword: DeleteStudentArgs['password'],
  ): ReturnType<StudentMutationResolver['delete']> {
    await this.utilValidator.ifWrongPasswordThrow({
      plainPassword,
      hashPassword: user.password,
    });
    const result = await this.studentRepository.softDelete(user.id);
    return result.affected === 1;
  }

  @Transactional()
  async update(
    user: Student,
    { email, password, confirmPassword, name, gender, birthDate }: UpdateStudentInput,
  ): ReturnType<StudentMutationResolver['update']> {
    if (password) {
      this.utilValidator.ifThereIsPasswordButWithoutConfirmPasswordThrow(confirmPassword);
      user.password = await this.utilHash.genHash(password);
    }
    user.update({ email, name, gender, birthDate });
    await this.studentRepository.save(user);
    return plainToClass(StudentModel, user);
  }

  async getToken({ email, password }: GetTokenInput): ReturnType<UtilHelper['getToken']> {
    return this.utilHepler.getToken(this.studentRepository, { email, password });
  }
}
