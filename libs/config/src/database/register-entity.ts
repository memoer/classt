import { join } from 'path';

// MSA 가 아니기 때문에 도메인 엔티티용도가 아닌 스키마 등록용도로 libs/config/src/database/entity 에 엔티티를 등록
export const registerEntity = (...moduleNameList: string[]): string[] =>
  moduleNameList.map((moduleName) =>
    join(process.cwd(), 'dist/src', moduleName, '**', '*.entity.js'),
  );
