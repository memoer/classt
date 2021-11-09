import { CreateStudentOutput } from '@app/src/student/dto/create-student.out';
import { StudentModel } from '@app/src/student/dto/student.model';
import { ApiTestBuilder } from './common/api-test.builder';
import { getDataFromBody, testDescription } from './common/function';

export const studentE2ETest = (apiBuilder: ApiTestBuilder): void =>
  describe('[E2E] StudentResolver', () => {
    it(testDescription('mutation', '학생을 만들 수 있어야 한다.'), () =>
      apiBuilder
        .query(
          'mutation',
          `createStudent(input: { 
            email: "student@naver.com"
            name: "김학생"
            gender: FEMALE
            birthDate: "2021-11-07T15:08:06.555Z"
            password: "qwer1234#"
            confirmPassword: "qwer1234#" }) {
              data { id, name, gender, birthDate, email }
              token
          }`,
        )
        .sendGql()
        .expect(200)
        .expect((res) => {
          const {
            data: { id, name, gender, birthDate, email },
            token,
          } = getDataFromBody<CreateStudentOutput>(res, 'createStudent');
          apiBuilder.setStudent({
            id,
            name,
            gender,
            birthDate: new Date(birthDate).toISOString(),
            email,
            password: 'qwer1234#',
            token,
          });
          expect(id).toEqual(expect.any(Number));
          expect(email).toEqual('student@naver.com');
          expect(name).toEqual('김학생');
          expect(gender).toEqual('FEMALE');
          expect(birthDate).toEqual('2021-11-07T15:08:06.555Z');
          expect(token).toEqual(expect.any(String));
        }),
    );
    it(testDescription('mutation', '학생은 자신의 정보를 수정할 수 있어야 한다.'), () =>
      apiBuilder
        .query(
          'mutation',
          `updateStudent(input: {
            email: "student@google.com"
            name: "한학생"
            gender: MALE
            birthDate: "2021-09-01T15:08:06.555Z"
            password: "q1w2e3r4#"
            confirmPassword: "q1w2e3r4#" }) {
              id, name, gender, birthDate, email
          }`,
        )
        .includeToken('student')
        .sendGql()
        .expect(200)
        .expect((res) => {
          const { id, name, gender, birthDate, email } = getDataFromBody<StudentModel>(
            res,
            'updateStudent',
          );
          apiBuilder.setStudent({
            id,
            name,
            gender,
            birthDate: new Date(birthDate).toISOString(),
            email,
            password: 'q1w2e3r4#',
          });
          expect(id).toEqual(expect.any(Number));
          expect(email).toEqual('student@google.com');
          expect(name).toEqual('한학생');
          expect(gender).toEqual('MALE');
          expect(birthDate).toEqual('2021-09-01T15:08:06.555Z');
        }),
    );
    it(testDescription('query', '학생은 자신의 토큰을 조회할 수 있어야 한다.'), () =>
      apiBuilder
        .query(
          'query',
          `getStudentToken(input: { 
            email: "${apiBuilder.getStudent().email}",
            password: "${apiBuilder.getStudent().password}"
          })`,
        )
        .sendGql()
        .expect(200)
        .expect((res) => {
          const token = getDataFromBody<string>(res, 'getStudentToken');
          apiBuilder.setStudent({ token });
          expect(token).toEqual(expect.any(String));
        }),
    );
    it(testDescription('query', '학생은 자기 정보를 조회할 수 있어야 한다.'), () =>
      apiBuilder
        .query(
          'query',
          `getMyStudentInfo {
            id, email, name, gender, birthDate
          }`,
        )
        .includeToken('student')
        .sendGql()
        .expect(200)
        .expect((res) => {
          const { id, email, name, gender, birthDate } = getDataFromBody<StudentModel>(
            res,
            'getMyStudentInfo',
          );
          const curStudent = apiBuilder.getStudent();
          expect(id).toEqual(expect.any(Number));
          expect(email).toEqual(curStudent.email);
          expect(name).toEqual(curStudent.name);
          expect(gender).toEqual(curStudent.gender);
          expect(birthDate).toEqual(curStudent.birthDate);
        }),
    );
  });
