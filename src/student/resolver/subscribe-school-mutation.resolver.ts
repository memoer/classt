import { AuthGuardOf, CurrentUser } from '@app/etc';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { SubscribeSchoolService } from '../application/subscribe-school.service';
import { Student } from '../domain/entity/student.entity';
import { StudentSubscribedSchoolModel } from '../dto/student-subscribed-school.model';
import { StudentModel } from '../dto/student.model';
import { SubscribeSchoolArgs } from '../dto/subscribe-school.in';

@Resolver((of) => StudentModel)
@AuthGuardOf('STUDENT')
export class SubscribeSchoolMutationResolver {
  constructor(private readonly subscribeSchoolService: SubscribeSchoolService) {}

  @Mutation((returns) => StudentSubscribedSchoolModel, { name: 'subscribeSchool' })
  subscribe(
    @CurrentUser() me: Student,
    @Args() { schoolId }: SubscribeSchoolArgs,
  ): Promise<StudentSubscribedSchoolModel> {
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
