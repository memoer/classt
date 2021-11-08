import { INestApplication } from '@nestjs/common';

export type UserType = 'admin' | 'student';
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

export class ApiTestSpace {
  protected app: INestApplication;
  protected testData: TestData;
  protected admin = {
    id: 0,
    token: '',
    email: '',
    password: '',
  };
  protected student = {
    id: 0,
    token: '',
    email: '',
    password: '',
  };
  protected schoolId = 0;
  protected schoolNewsId = 0;
  setApp(app: INestApplication): void {
    this.app = app;
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
  setSchoolId(id: number): void {
    this.schoolId = id;
  }
  getSchoolId(): number {
    return this.schoolId;
  }
  setSchoolNewsId(id: number): void {
    this.schoolNewsId = id;
  }
  getSchoolNewsId(): number {
    return this.schoolNewsId;
  }
}
