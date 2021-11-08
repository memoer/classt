import { getConnection } from 'typeorm';

export const clearTestData = async (): Promise<void> => {
  const tableList = [
    'notification',
    'student_school',
    'school_news',
    'school',
    'admin_auth',
    'admin',
    'student',
  ];
  const promiseList = tableList.map((table) =>
    getConnection().createQueryBuilder().delete().from(table).execute(),
  );
  const result = await Promise.all(promiseList);
  result.forEach((v, idx) => {
    console.log(`${tableList[idx]} delete -> ${v.affected}`);
  });
};
