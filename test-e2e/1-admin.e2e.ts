import { AdminAuthModel } from '@app/src/admin/dto/admin-auth.model';
import { AdminModel } from '@app/src/admin/dto/admin.model';
import { CreateAdminOutput } from '@app/src/admin/dto/create-admin.out';
import { ApiTestBuilder } from './common/api-test.builder';
import { getDataFromBody, testDescription } from './common/function';

class AdminModelWithResolveType extends AdminModel {
  authList: AdminAuthModel[];
}

export const adminE2ETest = (apiBuilder: ApiTestBuilder): void =>
  describe('[E2E] AdminResolver', () => {
    it(testDescription('mutation', '관리자 아이디를 만들 수 있어야 한다.'), () =>
      apiBuilder
        .query(
          'mutation',
          `createAdmin(input: {email: "test@naver.com", password: "qwert12345#", confirmPassword: "qwert12345#", name: "abc"}) {
            data { id, email, name, authList { id, type } }
            token
          }`,
        )
        .sendGql()
        .expect(200)
        .expect((res) => {
          const { data, token } = getDataFromBody<CreateAdminOutput>(res, 'createAdmin');
          const { id, email, name, authList } = data as AdminModelWithResolveType;
          apiBuilder.setAdmin({ id, token, name, email, password: 'qwert12345#' });
          expect(token).toEqual(expect.any(String));
          expect(id).toEqual(expect.any(Number));
          expect(email).toEqual('test@naver.com');
          expect(name).toEqual('abc');
          expect(authList).toEqual([]);
        }),
    );

    it(testDescription('query', '관리자의 토큰을 조회할 수 있어야 한다.'), () =>
      apiBuilder
        .query(
          'query',
          `getAdminToken(input:{email:"${apiBuilder.getAdmin().email}", password:"${
            apiBuilder.getAdmin().password
          }"})`,
        )
        .sendGql()
        .expect(200)
        .expect((res) => {
          const token = getDataFromBody<string>(res, 'getAdminToken');
          apiBuilder.setAdmin({ token });
          expect(token).toEqual(expect.any(String));
        }),
    );

    it(testDescription('mutation', '관리자의 정보를 수정할 수 있어야 한다.'), () =>
      apiBuilder
        .query(
          'mutation',
          `updateAdmin(input: {email:"test@google.com", name:"zxc", password:"q1w2e3r4t5y6#", confirmPassword:"q1w2e3r4t5y6#"}){
            id, name, email, authList { id, type }
          }`,
        )
        .includeToken('admin')
        .sendGql()
        .expect(200)
        .expect((res) => {
          const { id, email, name } = getDataFromBody<AdminModel>(res, 'updateAdmin');
          apiBuilder.setAdmin({
            name,
            email: 'test@google.com',
            password: 'q1w2e3r4t5y6#',
          });
          expect(id).toEqual(expect.any(Number));
          expect(email).toEqual('test@google.com');
          expect(name).toEqual('zxc');
        }),
    );

    it(testDescription('query', '관리자의 정보를 조회할 수 있어야 한다.'), () =>
      apiBuilder
        .query(
          'query',
          `getMyAdminInfo {
            id, email, name,
            authList { id, type }
          }`,
        )
        .includeToken('admin')
        .sendGql()
        .expect(200)
        .expect((res) => {
          const { id, email, name, authList } = getDataFromBody<AdminModelWithResolveType>(
            res,
            'getMyAdminInfo',
          );
          const curAdmin = apiBuilder.getAdmin();
          expect(id).toEqual(curAdmin.id);
          expect(email).toEqual(curAdmin.email);
          expect(name).toEqual(curAdmin.name);
          expect(authList).toEqual([]);
        }),
    );

    it(testDescription('mutation', '관리자에게 권한을 추가할 수 있어야 한다.'), () =>
      apiBuilder
        .query(
          'mutation',
          `addAdminAuth(authTypeList: [CREATE_SCHOOL, UPDATE_SCHOOL, DELETE_SCHOOL, CREATE_SCHOOL_NEWS, UPDATE_SCHOOL_NEWS, DELETE_SCHOOL_NEWS]) {
            id
            type
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

    it(testDescription('mutation', '관리자의 권한을 제거할 수 있어야 한다.'), () =>
      apiBuilder
        .query('mutation', `deleteAdminAuth(authTypeList: [CREATE_SCHOOL, CREATE_SCHOOL_NEWS])`)
        .includeToken('admin')
        .sendGql()
        .expect(200)
        .expect((res) => {
          const isSuccess = getDataFromBody<boolean>(res, 'deleteAdminAuth');
          expect(isSuccess).toEqual(true);
        }),
    );
  });
