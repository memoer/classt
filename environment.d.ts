declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'test' | 'local' | 'dev' | 'staging' | 'production';
      // SECURITY
      JWT_SECRET: string;
      BCRYPT_SALT_OR_ROUNDS: string;
      // DATABASE
      DB_HOST: string;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      DB_DATABASE: string;
      DB_PORT: string;
      // REDIS
      REDIS_HOST: string;
      REDIS_PORT: string;
      CACHE_TTL: string;
      // AWS
      AWS_ACCESS_KEY_ID: string;
      AWS_SECRET_ACCESS_KEY: string;
      AWS_BUCKET: string;
    }
  }
}

export {};
