#!/bin/sh
shellPath=`pwd -P`
domainName=$1
if [ -z "$1" ]; then
    echo "No argument supplied"
    exit 1
fi
modulePath=${shellPath}/src/${domainName}
testUnitPath=${shellPath}/test-unit/${domainName}

yarn nest g res ${domainName}
# ? src module package 설정
mkdir ${modulePath}/application ${modulePath}/domain ${modulePath}/dto ${modulePath}/infra ${modulePath}/resolver
mv ${modulePath}/${domainName}.resolver.ts ${modulePath}/resolver/${domainName}-query.resolver.ts
mv ${modulePath}/${domainName}.service.ts ${modulePath}/application
# ? *.spec.ts 파일 이동
mkdir ${shellPath}/test-unit/src/${domainName}
mv ${modulePath}/*.spec.ts ${shellPath}/test-unit/src/${domainName}