import { getDataFromBody, getErrorFromBody, testDescription } from './common/fn';
import { ApiTestBuilder } from './common/api-test.builder';
import { SchoolModel } from '@app/src/school/dto/school.model';
import { SchoolNewsModel } from '@app/src/school/dto/school-news.model';

export const deleteE2ETest = (apiBuilder: ApiTestBuilder): void =>
  describe('[E2E] DeleteResolver', () => {
    it(testDescription('mutation', '관리자의 아이디를 탈퇴할 수 있어야 한다.'), () =>
      apiBuilder
        .query('mutation', `deleteAdmin(password:"${apiBuilder.getAdmin().password}")`)
        .includeToken('admin')
        .sendGql()
        .expect(200)
        .expect((res) => {
          const isSuccess = getDataFromBody<boolean>(res, 'deleteAdmin');
          expect(isSuccess).toEqual(true);
        }),
    );
    it(testDescription('mutation', '탈퇴된 관리자를 복구시킬 수 있어야 한다.'), () =>
      apiBuilder
        .query('mutation', `restoreAdmin(id:${apiBuilder.getAdmin().id})`)
        .sendGql()
        .expect(200)
        .expect((res) => {
          const isSuccess = getDataFromBody<boolean>(res, 'restoreAdmin');
          expect(isSuccess).toEqual(true);
        }),
    );
    it(
      testDescription(
        'mutation',
        '권한이 있는 관리자는 작성된 학교의 소식을 삭제할 수 있어야 한다.',
      ),
      () =>
        apiBuilder
          .query('mutation', `deleteSchoolNews(id:${apiBuilder.getSchoolNewsId()})`)
          .includeToken('admin')
          .sendGql()
          .expect(200)
          .expect((res) => {
            const isSuccess = getDataFromBody<boolean>(res, 'deleteSchoolNews');
            expect(isSuccess).toEqual(true);
          }),
    );
    it(
      testDescription(
        'mutation',
        '권한이 있는 관리자는 제거된 학교의 소식을 복구시킬 수 있어야 한다.',
      ),
      () =>
        apiBuilder
          .query(
            'mutation',
            `restoreSchoolNews(id:${apiBuilder.getSchoolNewsId()}){ id, information }`,
          )
          .includeToken('admin')
          .sendGql()
          .expect(200)
          .expect((res) => {
            const { id, information } = getDataFromBody<SchoolNewsModel>(res, 'restoreSchoolNews');
            expect(id).toEqual(expect.any(Number));
            expect(information).toEqual(expect.any(String));
          }),
    );
    it(
      testDescription('mutation', '학생은 구독 중인 학교 페이지를 구독 취소할 수 있어야 한다.'),
      () =>
        apiBuilder
          .query('mutation', `unsubscribeSchool(schoolId:${apiBuilder.getSchoolId()})`)
          .includeToken('student')
          .sendGql()
          .expect(200)
          .expect((res) => {
            const isSuccess = getDataFromBody<boolean>(res, 'unsubscribeSchool');
            expect(isSuccess).toEqual(true);
          }),
    );
    it(
      testDescription(
        'mutation',
        '학생이 구독하지 않은 학교를 구독 취소할 경우, BadRequest Exception Error 을 던져야 한다.',
      ),
      () =>
        apiBuilder
          .query('mutation', `unsubscribeSchool(schoolId:999)`)
          .includeToken('student')
          .sendGql()
          .expect(200)
          .expect((res) => {
            const [err] = getErrorFromBody(res);
            expect(err.extensions.response.statusCode).toEqual(400);
          }),
    );
    it(testDescription('mutation', '권한이 있는 관리자는 학교를 제거할 수 있어야 한다.'), () =>
      apiBuilder
        .query('mutation', `deleteSchool(id:${apiBuilder.getSchoolId()})`)
        .includeToken('admin')
        .sendGql()
        .expect(200)
        .expect((res) => {
          const isSuccess = getDataFromBody<boolean>(res, 'deleteSchool');
          expect(isSuccess).toEqual(true);
        }),
    );
    it(
      testDescription('mutation', '권한이 있는 관리자는 제거된 학교를 복구시킬 수 있어야 한다.'),
      () =>
        apiBuilder
          .query('mutation', `restoreSchool(id:${apiBuilder.getSchoolId()}){ id, name, location }`)
          .includeToken('admin')
          .sendGql()
          .expect(200)
          .expect((res) => {
            const { id, name, location } = getDataFromBody<SchoolModel>(res, 'restoreSchool');
            expect(id).toEqual(expect.any(Number));
            expect(name).toEqual(expect.any(String));
            expect(location).toEqual(expect.any(String));
          }),
    );
    it(testDescription('mutation', '학생은 회원탈퇴를 할 수 있어야 한다.'), () =>
      apiBuilder
        .query('mutation', `deleteStudent(password:"${apiBuilder.getStudent().password}")`)
        .includeToken('student')
        .sendGql()
        .expect(200)
        .expect((res) => {
          const isSuccess = getDataFromBody<boolean>(res, 'deleteStudent');
          expect(isSuccess).toEqual(true);
        }),
    );
    it(testDescription('mutation', '회원탈퇴했던 학생을 복구시킬 수 있어야 한다.'), () =>
      apiBuilder
        .query(
          'mutation',
          `restoreStudent(input:{
            id:${apiBuilder.getStudent().id},
            password:"${apiBuilder.getStudent().password}"}
          )`,
        )
        .sendGql()
        .expect(200)
        .expect((res) => {
          const isSuccess = getDataFromBody<boolean>(res, 'restoreStudent');
          expect(isSuccess).toEqual(true);
        }),
    );
  });
