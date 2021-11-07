import { Resolver } from '@nestjs/graphql';
import { NotificationService } from '../application/notification.service';

@Resolver()
export class NotificationMutationResolver {
  constructor(private readonly notificationService: NotificationService) {}
}
