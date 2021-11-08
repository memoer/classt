import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { resolve } from 'path';
import { config } from 'dotenv';

export type QueryType = 'mutation' | 'query';
interface TestData {
  query: string;
  header?: Record<string, any>;
}

export class ApiTestBuilder {
  private readonly app: INestApplication;
  private testData: TestData;
  private token: string;

  constructor(app: INestApplication) {
    config({ path: resolve(__dirname, '../.env.test') });
    this.app = app;
  }

  setToken(token: string): void {
    this.token = token;
  }
  getToken(): string {
    return this.token;
  }

  includeToken(): this {
    this.testData.header = { ...this.testData.header, Authorization: `Bearer ${this.token}` };
    return this;
  }

  header(key: string, value: string): this {
    this.testData.header = { ...this.testData.header, key: value };
    return this;
  }

  query(type: QueryType, query: string): this {
    this.testData = { query: `${type}{${query}}` };
    return this;
  }

  sendGql(): request.Test {
    const { query, header } = this.testData;
    const spec = request(this.app.getHttpServer()).post('/graphql');
    if (header) spec.set(header);
    return spec.send({ query }).expect(200);
  }
}
