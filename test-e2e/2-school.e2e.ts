import { AdminAuthModel } from '@app/src/admin/dto/admin-auth.model';
import { SchoolModel } from '@app/src/school/dto/school.model';
import { ApiTestBuilder } from './common/api-test.builder';
import { getDataFromBody, getErrorFromBody, testDescription } from './common/fn';

export const schoolE2ETest = (apiBuilder: ApiTestBuilder): void =>
  describe('[E2E] SchoolResolver', () => {
    it(testDescription('mutation', '권한이 없는 관리자는 학교를 추가할 수 없어야 한다.'), () =>
      apiBuilder
        .query(
          'mutation',
          `createSchool(input:{location:"서울", name:"연세대"}){
              id, location, name
            }`,
        )
        .includeToken('admin')
        .sendGql()
        .expect(200)
        .expect((res) => {
          const error = getErrorFromBody(res);
          expect(error).not.toBeUndefined();
          expect(error[0].extensions.response.statusCode).toEqual(403);
        }),
    );
    it(testDescription('mutation', '관리자에게 권한을 추가할 수 있어야 한다.'), () =>
      apiBuilder
        .query(
          'mutation',
          `addAdminAuth(authTypeList: [CREATE_SCHOOL]) {
            id, type
          }`,
        )
        .includeToken('admin')
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
    it(
      testDescription(
        'mutation',
        '권한이 있는 관리자는 지역, 학교명으로 학교 페이지를 생성할 수 있어야 한다.',
      ),
      () =>
        apiBuilder
          .query(
            'mutation',
            `createSchool(input:{location:"서울", name:"연세대"}){
            id, location, name
          }`,
          )
          .includeToken('admin')
          .sendGql()
          .expect(200)
          .expect((res) => {
            const { id, location, name } = getDataFromBody<SchoolModel>(res, 'createSchool');
            apiBuilder.setSchoolId(id);
            expect(id).toEqual(expect.any(Number));
            expect(location).toEqual('서울');
            expect(name).toEqual('연세대');
          }),
    );
    it(testDescription('mutation', '권한이 있는 학교의 정보를 수정할 수 있어야 한다.'), () =>
      apiBuilder
        .query(
          'mutation',
          `updateSchool(input:{id:${apiBuilder.getSchoolId()}, name:"포항공대", location:"포항"}){
            id, location, name
          }`,
        )
        .includeToken('admin')
        .sendGql()
        .expect(200)
        .expect((res) => {
          const { id, location, name } = getDataFromBody<SchoolModel>(res, 'updateSchool');
          expect(id).toEqual(expect.any(Number));
          expect(name).toEqual('포항공대');
          expect(location).toEqual('포항');
        }),
    );
  });
