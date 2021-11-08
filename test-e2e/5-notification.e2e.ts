import { ApiTestBuilder } from './common/api-test.builder';
import { getDataFromBody, testDescription } from './common/fn';

export const notificationE2ETest = (apiBuilder: ApiTestBuilder): void =>
  describe('NotificationResolver [E2E]', () => {
    it(
      testDescription(
        'mutation',
        '학생은 자기가 받은 모든 알람을 한 번에 읽음 표시할 수 있어야 한다.',
      ),
      () =>
        apiBuilder
          .query('mutation', 'readAllNotification')
          .includeToken('student')
          .sendGql()
          .expect(200)
          .expect((res) => {
            const isSuccess = getDataFromBody<boolean>(res, 'readAllNotification');
            expect(isSuccess).toEqual(true);
          }),
    );
  });
