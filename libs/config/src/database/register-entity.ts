import { join } from 'path';

export const registerEntity = (...moduleNameList: string[]): string[] =>
  moduleNameList.map((moduleName) =>
    join(
      process.cwd(),
      process.env.NODE_ENV === 'test' ? '' : 'dist',
      `src/${moduleName}/domain/entity`,
      '*.entity{.ts,.js}',
    ),
  );
