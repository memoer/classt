import { getDataFromBody, testDescription } from './common/fn';
import { ApiTestBuilder } from './common/api-test.builder';

export const deleteE2ETest = (apiBuilder: ApiTestBuilder): void =>
  describe('NotificationResolver [E2E]', () => {
    it(testDescription('mutation', '관리자의 아이디를 탈퇴할 수 있어야 한다.'), () =>
      apiBuilder
        .query('mutation', `deleteAdmin(password:"${apiBuilder.getUser('admin').password}")`)
        .includeToken('admin')
        .sendGql()
        .expect(200)
        .expect((res) => {
          const result = getDataFromBody<boolean>(res, 'deleteAdmin');
          expect(result).toEqual(true);
        }),
    );
    it(testDescription('mutation', '탈퇴된 관리자를 복구시킬 수 있어야 한다.'), () =>
      apiBuilder
        .query('mutation', `restoreAdmin(id:${apiBuilder.getUser('admin').id})`)
        .sendGql()
        .expect(200)
        .expect((res) => {
          const result = getDataFromBody<boolean>(res, 'restoreAdmin');
          expect(result).toEqual(true);
        }),
    );
    it(testDescription('mutation', '권한이 있는 관리자는 학교를 제거할 수 있어야 한다.'), () =>
      apiBuilder
        .query('mutation', `deleteSchool(id:${apiBuilder.getSchoolId()})`)
        .includeToken('admin')
        .sendGql()
        .expect(200)
        .expect((res) => {
          const result = getDataFromBody<boolean>(res, 'deleteSchool');
          expect(result).toEqual(true);
        }),
    );
    it(
      testDescription('mutation', '권한이 있는 관리자는 학교의 소식을 제거할 수 있어야 한다.'),
      () =>
        apiBuilder
          .query('mutation', `deleteSchoolNews(id:${apiBuilder.getSchoolNewsId()})`)
          .includeToken('admin')
          .sendGql()
          .expect(200)
          .expect((res) => {
            const result = getDataFromBody<boolean>(res, 'deleteSchoolNews');
            expect(result).toEqual(true);
          }),
    );
  });
