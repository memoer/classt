import { PaginationInputBySkip } from '@app/config/graphql/core.dto';
import { Notification } from '@app/src/notification/domain/entity/notification.entity';
import { StudentSchool } from '@app/src/student/domain/entity/student-school.entity';
import { UtilDAO } from '@app/util';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Connection } from 'typeorm';
import { SchoolNews } from '../domain/entity/school-news.entity';
import { GetListSubscribedSchoolNewsInput } from '../dto/get-list-subscribed-school-news.in';
import { SchoolNewsModel } from '../dto/school-news.model';
import { SchoolNewsQueryResolver } from '../resolver/school-news-query.resolver';

@Injectable()
export class SchoolNewsDAO {
  constructor(
    @InjectConnection() private readonly dbConn: Connection,
    private readonly utilDAO: UtilDAO,
  ) {}

  async getListSubscribed(
    studentId: number,
    { schoolId, ...page }: GetListSubscribedSchoolNewsInput,
  ): ReturnType<SchoolNewsQueryResolver['getListSubscribed']> {
    const result = await this.dbConn
      .createQueryBuilder()
      .select(['school.id AS "sId"'])
      .from(StudentSchool, 'student_school')
      .innerJoin('student_school.school', 'school')
      .where('student_school.student_id = :studentId AND student_school.school_id = :schoolId', {
        studentId,
        schoolId,
      })
      .getRawOne<{ sId?: string }>();
    if (!result) return [[], 0];
    const [dataList, totalCount] = await this.dbConn
      .createQueryBuilder()
      .select(['school_news'])
      .from(SchoolNews, 'school_news')
      .where('school_news.school_id = :schoolId', { schoolId: result.sId })
      .limit(page.pageSize)
      .skip(this.utilDAO.getSkip(page))
      .orderBy('school_news.created_at', 'DESC')
      .getManyAndCount();
    return [plainToClass(SchoolNewsModel, dataList), totalCount];
  }

  async getListArchived(
    studentId: number,
    args: PaginationInputBySkip,
  ): ReturnType<SchoolNewsQueryResolver['getListArchived']> {
    const [dataList, totalCount] = await this.dbConn
      .createQueryBuilder()
      .select(['notification', 'school_news'])
      .from(Notification, 'notification')
      .innerJoin('notification.schoolNews', 'school_news')
      .where('notification.student_id = :studentId', { studentId })
      .limit(args.pageSize)
      .skip(this.utilDAO.getSkip(args))
      .orderBy('school_news.created_at', 'DESC')
      .getManyAndCount();
    return [
      plainToClass(
        SchoolNewsModel,
        dataList.map((data) => data.schoolNews),
      ),
      totalCount,
    ];
  }
}
