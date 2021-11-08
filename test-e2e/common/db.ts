import { getConnection } from 'typeorm';
import { ApiTestBuilder } from './api-test.builder';
export const clearTestData = async (apiBuilder: ApiTestBuilder): Promise<void> => {
  const tableList = [
    { id: apiBuilder.getSchoolNewsId(), name: 'school_news' },
    { id: apiBuilder.getSchoolId(), name: 'school' },
    { name: 'admin_auth' },
    { id: apiBuilder.getUser('admin').id, name: 'admin' },
    { id: apiBuilder.getUser('student').id, name: 'student' },
  ];
  const promiseList = tableList.map(({ name, id }) => {
    const qb = getConnection().createQueryBuilder().delete().from(name);
    if (name === 'admin_auth') {
      return qb.execute();
    }
    return qb.where('id = :id', { id }).execute();
  });
  const result = await Promise.all(promiseList);
  result.forEach((v, idx) => {
    const table = tableList[idx];
    const msg = v.affected === 1 ? `${table} successfully deleted` : `${table} delete error`;
    console.log(msg);
  });
};
