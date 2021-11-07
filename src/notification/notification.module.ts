import { Module } from '@nestjs/common';
import { NotificationService } from './application/notification.service';
import { NotificationMutationResolver } from './resolver/notification-mutation.resolver';

@Module({
  providers: [
    // 표현
    NotificationMutationResolver,
    // 응용
    NotificationService,
  ],
})
export class NotificationModule {}
