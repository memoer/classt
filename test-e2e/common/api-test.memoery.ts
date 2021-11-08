import { Gender } from '@app/src/student/domain/entity/student.entity';
import { INestApplication } from '@nestjs/common';

export type UserType = 'admin' | 'student';
interface TestData {
  query: string;
  header?: Record<string, any>;
}

interface User {
  id: number;
  token: string;
  name: string;
  email: string;
  password: string;
}
interface Student extends User {
  gender: Gender;
  birthDate: string;
}

export class ApiTestSpace {
  protected app: INestApplication;
  protected testData: TestData;
  protected admin = {
    id: 0,
    name: '',
    email: '',
    password: '',
    token: '',
  };
  protected student = {
    id: 0,
    name: '',
    email: '',
    password: '',
    gender: Gender.FEMALE,
    birthDate: '',
    token: '',
  };
  protected schoolId = 0;
  protected schoolNewsId = 0;
  setApp(app: INestApplication): void {
    this.app = app;
  }
  private setUser(type: UserType, { id, token, name, email, password }: Partial<User>): void {
    const key = type;
    if (id !== undefined) this[key].id = id;
    if (name) this[key].name = name;
    if (token) this[key].token = token;
    if (email) this[key].email = email;
    if (password) this[key].password = password;
  }
  setAdmin(args: Partial<User>): void {
    this.setUser('admin', args);
  }
  setStudent({ gender, birthDate, ...rest }: Partial<Student>): void {
    this.setUser('student', rest);
    if (gender) this.student.gender = gender;
    if (birthDate) this.student.birthDate = birthDate;
  }
  getAdmin(): User {
    return this.admin;
  }
  getStudent(): Student {
    return this.student;
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
