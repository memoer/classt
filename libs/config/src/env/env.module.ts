import { ConfigModule as cm } from '@nestjs/config';

export const EnvModule = cm.forRoot({
  isGlobal: true,
  envFilePath: `.env.${process.env.NODE_ENV}`,
});
