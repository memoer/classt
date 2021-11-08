import * as request from 'supertest';
import { join } from 'path';
import { config } from 'dotenv';
import { ApiTestSpace, UserType } from './api-test.memoery';

export type QueryType = 'mutation' | 'query';

export class ApiTestBuilder extends ApiTestSpace {
  constructor() {
    super();
    config({ path: join(process.cwd(), '.env.test') });
  }

  includeToken(type: UserType): this {
    this.testData.header = {
      ...this.testData.header,
      Authorization: `Bearer ${type === 'admin' ? this.admin.token : this.student.token}`,
    };
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
    return spec.send({ query });
  }
}
