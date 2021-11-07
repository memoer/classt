import * as logger from 'morgan';
import { Request } from 'express';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import { Router } from 'express';
import { UtilCommon, UtilModule } from '@app/util';
import { GqlCtx } from '..';
import { NestExpressApplication } from '@nestjs/platform-express';

export class Middleware {
  static sentryIsOn = ['dev', 'staging', 'production'].includes(process.env.NODE_ENV);
  private app: NestExpressApplication;
  private isStagingOrProd: boolean;
  constructor(app: NestExpressApplication) {
    this.app = app;
    this.isStagingOrProd = this.app
      .select(UtilModule)
      .get(UtilCommon)
      .isEnvOf('staging', 'production');
  }

  onLogger(): void {
    const logFormat =
      ':remote-addr :remote-user :client-addr [:date[iso]] "HTTP/:http-version :operationName" :status :res[content-length] ":user-agent" :response-time ms :userId';
    if (this.isStagingOrProd) {
      logger.token(
        'client-addr',
        ({ headers }: GqlCtx['req']): string => (headers['x-forwarded-for'] as string) || '-',
      );
      logger.token('userId', (req: GqlCtx['req']): string =>
        'user' in req ? String(req.user.id) : '-1',
      );
      logger.token('operationName', ({ body: { query } }: Request) => {
        if (!query) return null;
        if (query.operationName) return query.operationName;
        const operationName = query.split('{')[1].trim().split('(')[0].split('}')[0].trim();
        return operationName || null;
      });
    }
    this.app.use(logger(this.isStagingOrProd ? logFormat : 'dev'));
  }

  onSentry(): void {
    if (!Middleware.sentryIsOn) return;
    Sentry.init({
      environment: process.env.NODE_ENV,
      dsn: process.env.SENTRY_DSN,
      integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        // enable Express.js middleware tracing
        new Tracing.Integrations.Express({
          app: this.app as unknown as Router,
        }),
      ],
      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 1.0,
    });
    this.app.use(Sentry.Handlers.requestHandler({ user: ['id'] }));
    this.app.use(Sentry.Handlers.tracingHandler());
  }
}
