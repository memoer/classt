### Start

`yarn start:dev <local|dev|staging>`

1. **.env.example -> .env.local 로 이름을 변경하고 시작해야 합니다.**
2. 위의 명령어를 실행할 경우, `./scripts/start-(dev|debug).sh` 가 실행됩니다.
3. 서버가 띄워지기 전에, Docker 를 띄웁니다. [ DB, Redis Container ]

- 완전히 맨 처음에 서버를 띄울 경우, 아래와 같은 에러가 발생할 수 있습니다.
- Docker에서 DB가 아직 완전하게 띄워지지 않아서 나는 Error 입니다.
- 서버가 완전히 꺼지지 않고, Connection을 재시도 하고 2-3번 아래의 Error 가 뜨고 그 이후론, 정상적으로 작동됩니다.

```
Error: Connection terminated unexpectedly
    at Connection.<anonymous> (/Users/hanjaenam/Archive/request/classt/node_modules/pg/lib/client.js:132:73)
    at Object.onceWrapper (events.js:519:28)
    at Connection.emit (events.js:400:28)
    at Connection.emit (domain.js:470:12)
    at Socket.<anonymous> (/Users/hanjaenam/Archive/request/classt/node_modules/pg/lib/connection.js:107:12)
    at Socket.emit (events.js:412:35)
    at Socket.emit (domain.js:470:12)
    at endReadableNT (internal/streams/readable.js:1317:12)
    at processTicksAndRejections (internal/process/task_queues.js:82:21)
```

### debug

`yarn start:debug <local|dev|staging>`

1. `yarn start:debug <local>`
2. vscode debug 화면 -> `Attach NestJS WS` 클릭

### 다른 README.md 용도

- `README-pacakge.md` -> 한 모듈 내에서, 각각의 클래스가 가져가야 할 역할/책임을 확실히 분리시키기 위해 기록
- `README-rules.md` -> 개발 규칙을 기록 [ 파일이름, git branch/commit 규칙, graphql 기본 endpoint 이름 ... ]
