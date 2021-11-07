import { PaginationInputBySkip } from '@app/config/graphql/core.dto';
import { StudentSchool } from '@app/src/student/domain/entity/student-school.entity';
import { UtilDAO } from '@app/util';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Connection } from 'typeorm';
import { SchoolModel } from '../dto/school.model';
import { SchoolQueryResolver } from '../resolver/school-query.resolver';

@Injectable()
export class SchoolDAO {
  constructor(
    @InjectConnection() private readonly dbConn: Connection,
    private readonly utilDAO: UtilDAO,
  ) {}

  async findManyAndCount(
    studentId: number,
    input: PaginationInputBySkip,
  ): ReturnType<SchoolQueryResolver['getListSubscribed']> {
    const [dataList, totalCount] = await this.dbConn
      .createQueryBuilder()
      .select(['student_school', 'school'])
      .from(StudentSchool, 'student_school')
      .innerJoin('student_school.school', 'school')
      .where('student_school.student_id = :studentId', {
        studentId,
      })
      .limit(input.pageSize)
      .skip(this.utilDAO.getSkip(input))
      .getManyAndCount();
    return [
      plainToClass(
        SchoolModel,
        dataList.map((data) => data.school),
      ),
      totalCount,
    ];
  }
}
