import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from '../student/student.module';
import { NotificationOpenHostService } from './application/service/notification-oh.service';
import { NotificationService } from './application/service/notification.service';
import { NotificationRepository } from './infra/notification.repository';
import { NotificationMutationResolver } from './resolver/notification-mutation.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationRepository]), StudentModule],
  providers: [
    // 표현
    NotificationMutationResolver,
    NotificationService,
    NotificationOpenHostService,
  ],
  exports: [NotificationOpenHostService],
})
export class NotificationModule {}
