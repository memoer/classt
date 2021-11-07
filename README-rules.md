### GraphQL Endpoint Name Rules

기본 CRUD에 대한 api endpoint name 규칙

- getList\*
- getOne\*
- create\*
- update\*
- delete\*

### Conventions

1. 파일, 폴더 -> `kebab-case`
2. 클래스 -> `PascalCase`
3. 그 외 -> `camelCase`

### src, libs

1. src/\*\* -> DomainModule만 존재
2. 그 외는 libs
   - `src`에 위치한 각각의 도메인 모듈이 공통적으로 사용하는 모듈입니다.
   - 필수적으로 사용하는 모듈들입니다. [ 예) DB, Redis, graphql... ]

### File Names

1. application/lib -> postFix: 없음
   - application/service 계층에서 사용하는 클래스에서 활용되는 로직들
2. application/service -> postFix: `*.service.ts`
   - 서비스 계층 클래스
3. domain/entity -> postFix: `*.entity.ts`
   - 도메인 계층의 Entity
4. doimain/service -> postFix: `*.service.ts`
   - 여러 도메인 로직이 합쳐질 때 사용
5. dto -> postFix: `*.dto.ts`
   - 각 계층별 통신 규약
6. infra -> postFix: `*.repository.ts, *.dao.ts`
   - 기술의 실제 구현 [ TypeORM, Prisma 등등 라이브러리를 바꿀 때, 해당 계층 로직만 변경하면 됨 ]
7. resolver -> postFix: `*-query.resolver.ts, *-type.resolver.ts, *-mutation.resolver.ts`
   - 표현 계층

### Branch Rules

1. fix/<msg>
2. feat/<msg>
3. refactor/<msg>
4. docs/<msg>
5. test/<msg>
6. chore/<msg>

### Commit Message Rules

- `commitlint` 를 통해 commit 할 때마다 commit message를 체크합니다.

1. feat: <msg>
2. fix: <msg>
3. docs: <msg>
   - 문서 작성
4. refactor: <msg>
5. test: <msg>
   - 테스트 코드 작성
6. chore: <msg>
   - 소스 제외 나머지 파일 수정
   - .vscode, package.json ...
7. ci: <msg>
   - Docker 수정
   - github actions, jenkins 등등 수정
