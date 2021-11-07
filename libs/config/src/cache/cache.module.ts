import * as redisStore from 'cache-manager-redis-store';
import { CacheModule as cm } from '@nestjs/common';

export const CacheModule = cm.register({
  store: redisStore,
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  ttl: Number(process.env.CACHE_TTL),
});
