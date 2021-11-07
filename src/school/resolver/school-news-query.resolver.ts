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

  @Query((type) => GetListSubscribedSchoolNewsOutput, { name: 'getListSubscribedSchoolNews' })
  @UseInterceptors(PaginationOutputInterceptor)
  getListSubscribed(
    @CurrentUser() me: Student,
    @Args('input') input: GetListSubscribedSchoolNewsInput,
  ): Promise<[SchoolNewsModel[], number]> {
    return this.schoolNewsDAO.findManyAndCount(me.id, input);
  }
}
