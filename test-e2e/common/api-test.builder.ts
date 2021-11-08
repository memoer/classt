import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { join } from 'path';
import { config } from 'dotenv';

export type QueryType = 'mutation' | 'query';
type UserType = 'admin' | 'student';
interface TestData {
  query: string;
  header?: Record<string, any>;
}

interface User {
  id: number;
  token: string;
  email: string;
  password: string;
}

export class ApiTestBuilder {
  private app: INestApplication;
  public testData: TestData;
  private admin = {
    id: 0,
    token: '',
    email: '',
    password: '',
  };
  private student = {
    id: 0,
    token: '',
    email: '',
    password: '',
  };

  constructor() {
    config({ path: join(process.cwd(), '.env.test') });
  }
  setUser(type: UserType, { id, token, email, password }: Partial<User>): void {
    const key = type;
    if (id !== undefined) this[key].id = id;
    if (token) this[key].token = token;
    if (email) this[key].email = email;
    if (password) this[key].password = password;
  }
  getUser(type: UserType): User {
    return type === 'admin' ? this.admin : this.student;
  }
  setApp(app: INestApplication): void {
    this.app = app;
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
