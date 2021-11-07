import { Global, Module } from '@nestjs/common';
import { UtilDAO } from '.';
import { UtilCommon } from './util-common';
import { UtilHash } from './util-hash';
import { UtilJwt } from './util-jwt';
import { UtilValidator } from './util-validator';

@Global()
@Module({
  providers: [UtilCommon, UtilHash, UtilDAO, UtilValidator, UtilJwt],
  exports: [UtilCommon, UtilHash, UtilDAO, UtilValidator, UtilJwt],
})
export class UtilModule {}
