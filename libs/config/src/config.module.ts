import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { EnvModule } from './env/env.module';
import { GraphqlModule } from './graphql/graphql.module';
import { CacheModule } from './cache/cache.module';
import { EventModule } from './event/event.module';
import { AwsModule } from './aws/aws.module';

@Module({
  imports: [AwsModule, CacheModule, EnvModule, EventModule, GraphqlModule, DatabaseModule],
})
export class ConfigModule {}
