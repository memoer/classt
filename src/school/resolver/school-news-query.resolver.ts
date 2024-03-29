import { PaginationInputBySkip } from '@app/config/graphql/core.dto';
import { AuthGuardOf, CurrentUser, PaginationOutputInterceptor } from '@app/etc';
import { Student } from '@app/src/student/domain/entity/student.entity';
import { UseInterceptors } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GetListSubscribedSchoolNewsInput } from '../dto/get-list-subscribed-school-news.in';
import { GetListSubscribedSchoolNewsOutput } from '../dto/get-list-subscribed-school-news.out';
import { SchoolNewsModel } from '../dto/school-news.model';
import { SchoolNewsDAO } from '../infra/school-news.dao';

@Resolver((of) => SchoolNewsModel)
@AuthGuardOf('STUDENT')
export class SchoolNewsQueryResolver {
  constructor(private readonly schoolNewsDAO: SchoolNewsDAO) {}

  @Query((type) => GetListSubscribedSchoolNewsOutput, {
    name: 'getListSubscribedSchoolNews',
    description: '학생이 구독중인 학교들의 소식 묵록',
  })
  @UseInterceptors(PaginationOutputInterceptor)
  getListSubscribed(
    @CurrentUser() me: Student,
    @Args('input') input: GetListSubscribedSchoolNewsInput,
  ): Promise<[SchoolNewsModel[], number]> {
    return this.schoolNewsDAO.getListSubscribed(me.id, input);
  }

  @Query((type) => GetListSubscribedSchoolNewsOutput, {
    name: 'getListArchivedSchoolNews',
    description: '학생이 구독한 시점부터 종료까지의 모든 소식들의 모음집',
  })
  @UseInterceptors(PaginationOutputInterceptor)
  getListArchived(
    @CurrentUser() me: Student,
    @Args('input') input: PaginationInputBySkip,
  ): Promise<[SchoolNewsModel[], number]> {
    return this.schoolNewsDAO.getListArchived(me.id, input);
  }
}
