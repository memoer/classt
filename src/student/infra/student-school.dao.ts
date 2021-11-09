import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Connection } from 'typeorm';
import { StudentSchool } from '../domain/entity/student-school.entity';
import { FindManyBySchoolIdArgs, FindOneArgs } from '../dto/student-school-dao.dto';
import { StudentSchoolModel } from '../dto/student-school.model';

@Injectable()
export class StudentSchoolDAO {
  constructor(@InjectConnection() private readonly dbConn: Connection) {}

  async findManyBySchoolId({
    schoolId,
    select,
  }: FindManyBySchoolIdArgs): Promise<StudentSchoolModel[]> {
    const qb = this.dbConn
      .createQueryBuilder()
      .from(StudentSchool, 'student_school')
      .where('student_school.schoolId = :schoolId', { schoolId });
    if (!select) {
      qb.select(['student_school']);
    } else {
      qb.select(select.map((s) => `student_school.${s}`));
    }
    const dataList = await qb.getMany();
    return plainToClass(StudentSchoolModel, dataList);
  }

  async findOne({ studentId, schoolId }: FindOneArgs): Promise<StudentSchool> {
    return this.dbConn
      .createQueryBuilder()
      .select(['student_school'])
      .from(StudentSchool, 'student_school')
      .where('student_school.studentId = :studentId', { studentId })
      .andWhere('student_school.schoolId = :schoolId', { schoolId })
      .getOne();
  }
}
