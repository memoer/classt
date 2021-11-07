import { PluginDefinition } from 'apollo-server-core';
import { ApolloError } from 'apollo-server-express';
import * as Sentry from '@sentry/node';
import { Middleware } from '@app/config/app/middleware';

const graphqlErrorHandlerPlugin: PluginDefinition = {
  requestDidStart: async () => ({
    didEncounterErrors: async (ctx): Promise<void> => {
      if (!Middleware.sentryIsOn || !ctx.operation) return;
      for (const err of ctx.errors) {
        const statusCode = err.originalError ? err.originalError['status'] || 500 : 500;
        if (err instanceof ApolloError) continue;
        if (statusCode < 500) continue;
        Sentry.withScope((scope) => {
          const {
            request: { query, variables, http },
            operation,
            operationName,
          } = ctx;
          scope.setTransactionName(operationName);
          scope.setTag('kind', operation?.operation);
          scope.setTag('status', statusCode);
          scope.setExtra('query', query);
          scope.setExtra('variables', variables);
          scope.setExtra('user-agent', http?.headers.get('user-agent'));
          scope.setExtra('ip', http?.headers.get('x-forwarded-for'));
          if (err.path) {
            scope.addBreadcrumb({
              category: 'query-path',
              message: err.path.join(' > '),
              level: Sentry.Severity.Debug,
            });
          }
          Sentry.captureException(err);
        });
      }
    },
  }),
};

export default graphqlErrorHandlerPlugin;
