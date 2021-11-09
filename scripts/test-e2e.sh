shellPath=`pwd -P`
docker-compose -f ${shellPath}/docker-compose.test.yml up -d
sleep 1.5
jest --config ${shellPath}/test-e2e/jest-e2e.json --forceExit
docker-compose -f ${shellPath}/docker-compose.test.yml down