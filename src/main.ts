import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import * as helmet from 'helmet';
import { Middleware } from '@app/config';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

export const bootstrap = async (AppModule: unknown): Promise<void> => {
  const app: NestExpressApplication = await NestFactory.create(AppModule, new ExpressAdapter());
  const middleware = new Middleware(app);
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet({ contentSecurityPolicy: false }));
  middleware.onLogger();
  middleware.onSentry();
  await app.listen(3000);
};

bootstrap(AppModule);
