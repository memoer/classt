import { ConfigModule } from '@app/config';
import { UtilModule } from '@app/util';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { graphqlUploadExpress } from 'graphql-upload';
import { AdminModule } from './admin/admin.module';
import { SchoolModule } from './school/school.module';
import { StudentModule } from './student/student.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    ConfigModule,
    UtilModule,
    // Domain
    AdminModule,
    SchoolModule,
    StudentModule,
    NotificationModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(graphqlUploadExpress())
      .forRoutes({ path: '/graphql', method: RequestMethod.POST });
  }
}
