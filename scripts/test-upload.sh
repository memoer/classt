#!/bin/bash
# curl -v localhost:4000/graphql \
#   -F operations='{"query":"mutation T($file:Upload!) {uploadFile(file:$file)}", "variables":{"file":null}}'\
#   -F map='{ "0": ["variables.file"] }' \
#   -F 0=@/Users/hanjaenam/Archive/2021-plan/2_project/ec-server/stone.jpg



curl -v -H "Authorization:Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjUwLCJpYXQiOjE2MTUxODIxMzcsImV4cCI6MjQ3OTA5NTczN30.SJvFUwSyhSCLCZ71DZHQs2_nkDp7QmxHZoAeHjvSYwI"\
  -F operations='{"query":"mutation T($input:UpdateUserInput!) {updateUser(input:$input){ id }}", "variables":{ "input":{"user":{"file":null} } }}'\
  -F map='{ "0": ["variables.input.user.file"] }'\
  -F 0=@/Users/hanjaenam/Archive/stone.jpg \
  localhost:3000/graphql