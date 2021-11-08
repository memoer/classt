import { AdminAuthModel } from '@app/src/admin/dto/admin-auth.model';
import { ApiTestBuilder } from './common/api-test.builder';
import { getDataFromBody, getErrorFromBody, testDescription } from './common/fn';

export const schoolE2ETest = (apiBuilder: ApiTestBuilder): void =>
  describe('StudentResolver [E2E]', () => {
    it(testDescription('mutation', '권한이 없는 관리자는 학교를 추가할 수 없어야 한다.'), () =>
      apiBuilder
        .query(
          'mutation',
          `createSchool(input:{location:"서울", name:"연세대"}){
              id, location, name
            }`,
        )
        .sendGql()
        .expect(200)
        .expect((res) => {
          const error = getErrorFromBody(res);
          expect(error).not.toBeUndefined();
          expect(error[0].extensions.code).toBe(409);
        }),
    );
    it(testDescription('mutation', '관리자에게 권한을 추가할 수 있어야 한다.'), () =>
      apiBuilder
        .query(
          'mutation',
          `addAdminAuth(authTypeList: [CREATE_SCHOOL]) {
          id
          type
        }`,
        )
        .sendGql()
        .expect(200)
        .expect((res) => {
          const result = getDataFromBody<AdminAuthModel>(res, 'addAdminAuth');
          expect(result).toEqual(
            expect.arrayContaining([
              expect.objectContaining({ id: expect.any(Number), type: expect.any(String) }),
            ]),
          );
        }),
    );
    it(testDescription('mutation', '권한이 있는 관리자는 학교를 추가할 수 있어야 한다.'), () =>
      apiBuilder
        .query(
          'mutation',
          `createSchool(input:{location:"서울", name:"연세대"}){
            id, location, name
          }`,
        )
        .sendGql()
        .expect(200)
        .expect((res) => {
          const result = getDataFromBody<AdminAuthModel>(res, 'addAdminAuth');
        }),
    );
    it.todo('deleteSchool');
    it.todo('updateSchool');
    it.todo('getListSubscribedSchool');
    it.todo('createSchoolNews');
    it.todo('deleteSchoolNews');
    it.todo('updateSchoolNews');
  });
//
