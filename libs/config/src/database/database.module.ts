import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { LoggerOptions } from 'typeorm';
import { registerEntity } from './register-entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const DatabaseModule = TypeOrmModule.forRootAsync({
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    const loggingOnEnv = (): LoggerOptions => {
      // test -> false
      // local / dev -> all
      // staging -> query, error, warn 로그
      // prod -> warn / error / slow 를 찍어야함 [ 로그 말고, sentry에 알리거나 (OR) 외부 경로에 저장하는 방식으로 ]
      switch (process.env.NODE_ENV) {
        case 'test':
          return false;
        case 'local':
          return 'all';
        case 'dev':
          return 'all';
        case 'staging':
          return ['error', 'warn'];
        case 'production':
          return false;
      }
    };
    return {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: registerEntity('admin', 'school'),
      synchronize: process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'dev',
      logging: loggingOnEnv(),
      namingStrategy: new SnakeNamingStrategy(),
    };
  },
});
