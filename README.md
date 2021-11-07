### Start

- `yarn start:dev <local|dev|staging>`
- `yarn start:debug <local|dev|staging>`

---

- **.env.example -> .env.local 로 이름을 변경하고 시작해야 합니다.**

1. 위의 명령어를 실행할 경우, `./scripts/start-(dev|debug).sh` 가 실행됩니다.
2. 서버가 띄워지기 전에, Docker 를 띄웁니다. [ DB, Redis Container ]

### debug

1. `yarn start:debug <local>`
2. vscode debug 화면 -> `Attach NestJS WS` 클릭

### 다른 README.md 용도

- `README-dev-process.md` -> 기능 추가할 때 개발 Process 를 기록
- `README-pacakge.md` -> 한 모듈 내에서, 각각의 클래스가 가져가야 할 역할/책임을 확실히 분리시키기 위해 기록
- `README-rules.md` -> 개발 규칙을 기록 [ 파일이름, git branch/commit 규칙, graphql 기본 endpoint 이름 ... ]
