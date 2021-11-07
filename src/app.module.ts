import { ConfigModule } from '@app/config';
import { UtilModule } from '@app/util';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { graphqlUploadExpress } from 'graphql-upload';
import { AppResolver } from './app.resolver';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule,
    UtilModule,
    AdminModule,
    // Domain
  ],
  providers: [AppResolver],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(graphqlUploadExpress())
      .forRoutes({ path: '/graphql', method: RequestMethod.POST });
  }
}
