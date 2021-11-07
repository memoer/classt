import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
// import { GraphQLUpload } from 'graphql-upload';
import { join } from 'path';
import { UtilCommon } from '@app/util';
import graphqlErrorHandlerPlugin from './plugin/graphql-error-handler.plugin';
import { DateScalar } from './scalar/date';
import { GqlCtx } from './interface/graphql.interface';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      inject: [UtilCommon],
      useFactory: async (utilService: UtilCommon) => ({
        autoSchemaFile: join(process.cwd(), 'dist/schema.gql'),
        uploads: false,
        context: ({ req, res }): GqlCtx => ({ req, locals: res.locals }),
        debug: !utilService.isEnvOf('production', 'staging'),
        playground: !utilService.isEnvOf('production'),
        introspection: !utilService.isEnvOf('production'),
        cors: { origin: '*' },
        plugins: [graphqlErrorHandlerPlugin],
        // resolvers: { Upload: GraphQLUpload },
      }),
    }),
  ],
  providers: [DateScalar],
})
export class GraphqlModule {}
