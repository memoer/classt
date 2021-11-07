import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked';
import * as helmet from 'helmet';
import { Middleware } from '@app/config';
import { AppModule } from './app.module';

export const bootstrap = async (AppModule: unknown): Promise<void> => {
  initializeTransactionalContext();
  const app: NestExpressApplication = await NestFactory.create(AppModule, new ExpressAdapter());
  const middleware = new Middleware(app);
  app.use(helmet({ contentSecurityPolicy: false }));
  middleware.onLogger();
  middleware.onSentry();
  await app.listen(3000);
};

bootstrap(AppModule);
