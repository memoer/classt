import { AuthGuardOf, CurrentUser } from '@app/etc';
import { Student } from '@app/src/student/domain/entity/student.entity';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { NotificationService } from '../application/service/notification.service';
import { NotificationModel } from '../dto/notification.model';
import { ReadNotificationArgs } from '../dto/read-notification.in';

@Resolver((of) => NotificationModel)
@AuthGuardOf('STUDENT')
export class NotificationMutationResolver {
  constructor(private readonly notificationService: NotificationService) {}

  @Mutation((returns) => Boolean, { name: 'readNotification' })
  read(@CurrentUser() me: Student, @Args() { id }: ReadNotificationArgs): Promise<boolean> {
    return this.notificationService.read(me.id, id);
  }

  @Mutation((returns) => Boolean, { name: 'readAllNotification' })
  readAll(@CurrentUser() me: Student): Promise<boolean> {
    return this.notificationService.readAll(me.id);
  }
}
