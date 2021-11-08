import { ConfigModule } from '@app/config';
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked';
import { UtilModule } from '@app/util';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleInit,
  RequestMethod,
} from '@nestjs/common';
import { graphqlUploadExpress } from 'graphql-upload';
import { AdminModule } from './admin/admin.module';
import { NotificationModule } from './notification/notification.module';
import { SchoolModule } from './school/school.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    ConfigModule,
    UtilModule,
    // Domain
    AdminModule,
    NotificationModule,
    SchoolModule,
    StudentModule,
  ],
})
export class AppModule implements NestModule, OnModuleInit {
  onModuleInit(): void {
    initializeTransactionalContext();
  }

  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(graphqlUploadExpress())
      .forRoutes({ path: '/graphql', method: RequestMethod.POST });
  }
}
