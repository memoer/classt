import { RoleGuardOf } from '@app/etc';
import { AdminAuthType } from '@app/src/admin/domain/entity/admin-auth.entity';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SchoolService } from '../application/service/school.service';
import { CreateSchoolInput } from '../dto/create-school.in';
import { DeleteSchoolArgs } from '../dto/delete-school.in';
import { RestoreSchoolArgs } from '../dto/restore-school.in';
import { SchoolModel } from '../dto/school.model';
import { UpdateSchoolInput } from '../dto/update-school.in';

@Resolver((of) => SchoolModel)
export class SchoolMutationResolver {
  constructor(private readonly schoolService: SchoolService) {}

  @Mutation((returns) => SchoolModel, { name: 'createSchool' })
  @RoleGuardOf(AdminAuthType.CREATE_SCHOOL)
  create(@Args('input') input: CreateSchoolInput): Promise<SchoolModel> {
    return this.schoolService.create(input);
  }

  @Mutation((returns) => Boolean, { name: 'deleteSchool' })
  @RoleGuardOf(AdminAuthType.DELETE_SCHOOL)
  delete(@Args() { id }: DeleteSchoolArgs): Promise<boolean> {
    return this.schoolService.delete(id);
  }

  @Mutation((returns) => SchoolModel, { name: 'updateSchool' })
  @RoleGuardOf(AdminAuthType.UPDATE_SCHOOL)
  update(@Args('input') input: UpdateSchoolInput): Promise<SchoolModel> {
    return this.schoolService.update(input);
  }

  @Mutation((returns) => SchoolModel, { name: 'restoreSchool' })
  @RoleGuardOf(AdminAuthType.UPDATE_SCHOOL)
  restore(@Args() { id }: RestoreSchoolArgs): Promise<SchoolModel> {
    return this.schoolService.restore(id);
  }
}
