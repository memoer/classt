import { AdminAuthModel } from '@app/src/admin/dto/admin-auth.model';
import { SchoolNewsModel } from '@app/src/school/dto/school-news.model';
import { SchoolModel } from '@app/src/school/dto/school.model';
import { StudentSchoolModel } from '@app/src/student/dto/student-school.model';
import { ApiTestBuilder } from './common/api-test.builder';
import { PaginationOutput } from './common/common.interface';
import { getDataFromBody, getErrorFromBody, testDescription } from './common/fn';

export const studentSchoolE2ETest = (apiBuilder: ApiTestBuilder): void =>
  describe('StudentSchoolResolver [E2E]', () => {
    it(testDescription('mutation', '학생은 학교 페이지를 구독할 수 있어야 한다.'), () =>
      apiBuilder
        .query(
          'mutation',
          `subscribeSchool(schoolId:${apiBuilder.getSchoolId()}){
            schoolId
            studentId
          }`,
        )
        .includeToken('student')
        .sendGql()
        .expect(200)
        .expect((res) => {
          const { schoolId, studentId } = getDataFromBody<StudentSchoolModel>(
            res,
            'subscribeSchool',
          );
          expect(schoolId).toEqual(apiBuilder.getSchoolId());
          expect(studentId).toEqual(apiBuilder.getStudent().id);
        }),
    );
    it(
      testDescription('mutation', '권한이 없는 관리자는 학교에 소식을 추가할 수 없어야 한다.'),
      () =>
        apiBuilder
          .query(
            'mutation',
            `createSchoolNews(input:{schoolId: ${apiBuilder.getSchoolId()}, information:"test information"}){
              id, information
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
          `addAdminAuth(authTypeList: [CREATE_SCHOOL_NEWS]) {
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
        '권한이 있는 관리자는 학교 페이지 내에 소식을 작성할 수 있어야 한다.',
      ),
      () =>
        apiBuilder
          .query(
            'mutation',
            `createSchoolNews(input:{schoolId: ${apiBuilder.getSchoolId()}, information:"test information"}){
              id, information
            }`,
          )
          .includeToken('admin')
          .sendGql()
          .expect(200)
          .expect((res) => {
            const { id, information } = getDataFromBody<SchoolNewsModel>(res, 'createSchoolNews');
            apiBuilder.setSchoolNewsId(id);
            expect(id).toEqual(expect.any(Number));
            expect(information).toEqual('test information');
          }),
    );
    it(
      testDescription(
        'mutation',
        '권한이 있는 관리자는 작성된 학교의 소식을 수정할 수 있어야 한다.',
      ),
      () =>
        apiBuilder
          .query(
            'mutation',
            `updateSchoolNews(input:{id:${apiBuilder.getSchoolNewsId()}, information:"updated information"}){
              id, information
            }`,
          )
          .includeToken('admin')
          .sendGql()
          .expect(200)
          .expect((res) => {
            const { id, information } = getDataFromBody<SchoolNewsModel>(res, 'updateSchoolNews');
            expect(id).toEqual(expect.any(Number));
            expect(information).toEqual('updated information');
          }),
    );
    it(testDescription('query', '학생은 구독 중인 학교 페이지 묵록을 확인할 수 있어야 한다.'), () =>
      apiBuilder
        .query(
          'query',
          `getListSubscribedSchool(input:{pageSize:10, pageNumber:1}){
            dataList{ id, location, name }
            curPage, hasNextPage, totalPage
          }`,
        )
        .includeToken('student')
        .sendGql()
        .expect(200)
        .expect((res) => {
          const { dataList, curPage, hasNextPage, totalPage } = getDataFromBody<
            PaginationOutput<SchoolModel>
          >(res, 'getListSubscribedSchool');
          expect(dataList).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                id: expect.any(Number),
                location: expect.any(String),
                name: expect.any(String),
              }),
            ]),
          );
          expect(curPage).toEqual(expect.any(Number));
          expect(hasNextPage).toEqual(expect.any(Boolean));
          expect(totalPage).toEqual(expect.any(Number));
        }),
    );

    it(testDescription('query', '학생은 구독 중인 학교 페이지별 소식을 볼 수 있어야 한다.'), () =>
      apiBuilder
        .query(
          'query',
          `getListSubscribedSchoolNews(input:{schoolId:${apiBuilder.getSchoolId()},pageSize:10, pageNumber:1}){
            dataList{ id, information, createdAt }
            curPage, hasNextPage, totalPage
          }`,
        )
        .includeToken('student')
        .sendGql()
        .expect(200)
        .expect((res) => {
          const { dataList, curPage, hasNextPage, totalPage } = getDataFromBody<
            PaginationOutput<SchoolNewsModel>
          >(res, 'getListSubscribedSchoolNews');
          expect(dataList).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                id: expect.any(Number),
                information: expect.any(String),
                createdAt: expect.any(String),
              }),
            ]),
          );
          expect(curPage).toEqual(expect.any(Number));
          expect(hasNextPage).toEqual(expect.any(Boolean));
          expect(totalPage).toEqual(expect.any(Number));
        }),
    );
    it(
      testDescription(
        'query',
        '학생은 구독 중인 학교 소식을 자신의 뉴스피드에서 모아볼 수 있어야 한다.',
      ),
      () =>
        apiBuilder
          .query(
            'query',
            `getListArchivedSchoolNews(input:{pageSize:10, pageNumber:1}){
            dataList{ id, information, createdAt }
            curPage, hasNextPage, totalPage
          }`,
          )
          .includeToken('student')
          .sendGql()
          .expect(200)
          .expect((res) => {
            const { dataList, curPage, hasNextPage, totalPage } = getDataFromBody<
              PaginationOutput<SchoolNewsModel>
            >(res, 'getListArchivedSchoolNews');
            expect(dataList).toEqual(
              expect.arrayContaining([
                expect.objectContaining({
                  id: expect.any(Number),
                  information: expect.any(String),
                  createdAt: expect.any(String),
                }),
              ]),
            );
            expect(curPage).toEqual(expect.any(Number));
            expect(hasNextPage).toEqual(expect.any(Boolean));
            expect(totalPage).toEqual(expect.any(Number));
          }),
    );
  });
