import { PaginationInputBySkip } from '@app/config/graphql/core.dto';
import { AuthGuardOf, CurrentUser, PaginationOutputInterceptor } from '@app/etc';
import { Student } from '@app/src/student/domain/entity/student.entity';
import { UseInterceptors } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GetListSubscribedSchoolOutput } from '../dto/get-list-subscribed-school.out';
import { SchoolModel } from '../dto/school.model';
import { SchoolDAO } from '../infra/school.dao';

@Resolver((of) => SchoolModel)
@AuthGuardOf('STUDENT')
export class SchoolQueryResolver {
  constructor(private readonly schoolDAO: SchoolDAO) {}

  @Query((type) => GetListSubscribedSchoolOutput, { name: 'getListSubscribedSchool' })
  @UseInterceptors(PaginationOutputInterceptor)
  getListSubscribed(
    @CurrentUser() me: Student,
    @Args('input') input: PaginationInputBySkip,
  ): Promise<[SchoolModel[], number]> {
    return this.schoolDAO.getListSubscribed(me.id, input);
  }
}
