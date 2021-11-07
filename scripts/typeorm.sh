#!/bin/bash
command='node -r ts-node/register -r tsconfig-paths/register ./node_modules/typeorm/cli.js'
type=$1

case $type in
entity:create) ${command} entity:create -n ${2} -d src/${3}/domain/entity;;
subscriber:create) ${command} subscriber:create -n ${2} -d src/${3}/domain/entity;;
# migration 폴더에 ${2} 이름을 가진 파일 하나만 생성해줌 ( 쿼리는 직접 작성 )
migration:create) ${command} migration:create -n ${2};;
# 변경된 사항들 query로 알아서 만들어서 migration 폴더에 파일 만들어줌
migration:generate) ${command} migration:generate -n ${2} -o;;
# migration 실행 [ 쿼리 실행되는 것 ]
migration:run) ${command} migration:run;;
migration:revert) ${command} migration:revert;;
schema:log) ${command} schema:log;;
*) ${command} --help ;;
esac 



