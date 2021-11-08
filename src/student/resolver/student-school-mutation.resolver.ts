import { AuthGuardOf, CurrentUser } from '@app/etc';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { StudentSchoolService } from '../application/service/student-school.service';
import { Student } from '../domain/entity/student.entity';
import { StudentSchoolModel } from '../dto/student-school.model';
import { StudentModel } from '../dto/student.model';
import { SubscribeSchoolArgs } from '../dto/subscribe-school.in';

@Resolver((of) => StudentModel)
@AuthGuardOf('STUDENT')
export class StudentSchoolMutationResolver {
  constructor(private readonly subscribeSchoolService: StudentSchoolService) {}

  @Mutation((returns) => StudentSchoolModel, { name: 'subscribeSchool' })
  subscribe(
    @CurrentUser() me: Student,
    @Args() { schoolId }: SubscribeSchoolArgs,
  ): Promise<StudentSchoolModel> {
    return this.subscribeSchoolService.subscribe(me, schoolId);
  }

  @Mutation((returns) => Boolean, { name: 'unsubscribeSchool' })
  unsubscribe(
    @CurrentUser() me: Student,
    @Args() { schoolId }: SubscribeSchoolArgs,
  ): Promise<boolean> {
    return this.subscribeSchoolService.unsubscribe(me, schoolId);
  }
}
