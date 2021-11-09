import { RoleGuardOf } from '@app/etc';
import { AdminAuthType } from '@app/src/admin/domain/entity/admin-auth.entity';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SchoolNewsService } from '../application/service/school-news.service';
import { SchoolNews } from '../domain/entity/school-news.entity';
import { CreateSchoolNewsInput } from '../dto/create-school-news.in';
import { DeleteSchoolNewsArgs } from '../dto/delete-school-news.in';
import { RestoreSchoolNewsArgs } from '../dto/restore-school-news.in';
import { SchoolNewsModel } from '../dto/school-news.model';
import { UpdateSchoolNewsInput } from '../dto/update-school.news.in';

@Resolver((of) => SchoolNewsModel)
export class SchoolNewsMutationResolver {
  constructor(private readonly schoolNewsService: SchoolNewsService) {}

  @Mutation((returns) => SchoolNewsModel, { name: 'createSchoolNews' })
  @RoleGuardOf(AdminAuthType.CREATE_SCHOOL_NEWS)
  create(@Args('input') input: CreateSchoolNewsInput): Promise<SchoolNews> {
    return this.schoolNewsService.create(input);
  }

  @Mutation((returns) => Boolean, { name: 'deleteSchoolNews' })
  @RoleGuardOf(AdminAuthType.DELETE_SCHOOL_NEWS)
  delete(@Args() { id }: DeleteSchoolNewsArgs): Promise<boolean> {
    return this.schoolNewsService.delete(id);
  }

  @Mutation((returns) => SchoolNewsModel, { name: 'updateSchoolNews' })
  @RoleGuardOf(AdminAuthType.UPDATE_SCHOOL_NEWS)
  update(@Args('input') input: UpdateSchoolNewsInput): Promise<SchoolNewsModel> {
    return this.schoolNewsService.update(input);
  }

  @Mutation((returns) => SchoolNewsModel, { name: 'restoreSchoolNews' })
  @RoleGuardOf(AdminAuthType.UPDATE_SCHOOL_NEWS)
  restore(@Args() { id }: RestoreSchoolNewsArgs): Promise<SchoolNewsModel> {
    return this.schoolNewsService.restore(id);
  }
}
