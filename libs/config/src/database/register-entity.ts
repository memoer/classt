import { join } from 'path';

export const registerEntity = (...moduleNameList: string[]): string[] =>
  moduleNameList.map((moduleName) =>
    join(process.cwd(), 'dist/src', moduleName, '**', '*.entity.js'),
  );
