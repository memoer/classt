const { GraphQLDefinitionsFactory } = require('@nestjs/graphql');
const { readdirSync, statSync } = require('fs');
const { join } = require('path');

const selectedModuleNameList = process.argv.slice(2);
const srcPath = join(process.cwd(), 'src');
const coreGqlPath = join(process.cwd(), 'libs/config/src/graphql/core.gql');

function getModuleList() {
  const fileList = readdirSync(srcPath);
  return fileList
    .filter((file) => statSync(join(srcPath, file)).isDirectory())
    .filter((dir) => selectedModuleNameList.length === 0 || selectedModuleNameList.includes(dir))
    .map((dir) => ({ path: join(srcPath, dir), name: dir }));
}

async function generateTypings({ path, name }) {
  if (name === 'config') return;
  const definitionsFactory = new GraphQLDefinitionsFactory();
  await definitionsFactory.generate({
    typePaths: [coreGqlPath, join(path, 'dto/*.gql')],
    path: join(path, 'dto', `${name}-gql.dto.ts`),
    outputAs: 'class',
  });
  console.log(`${name}-gql.dto.ts successfully generated`);
}

getModuleList().forEach((module) => generateTypings(module));
