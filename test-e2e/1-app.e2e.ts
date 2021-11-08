import { ApiTestBuilder } from './common/api-test.builder';
import { desc, getDataFromBody } from './common/fn';

export default (apiBuilder: ApiTestBuilder): void =>
  it(desc('query', 'hello'), () =>
    apiBuilder
      .query('query', 'hello')
      .sendGql()
      .expect((res) => {
        const data = getDataFromBody(res, 'hello');
        expect(data).toBe('hello');
      }),
  );
