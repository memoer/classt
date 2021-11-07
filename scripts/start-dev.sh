#!/bin/bash
docker-compose -f docker-compose.local.yml up -d
yarn prebuild
NODE_ENV=$1 yarn nest start --watch