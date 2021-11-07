import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

// * Hash 유틸성 서비스
@Injectable()
export class UtilHash {
  private saltOrRounds: number;

  constructor() {
    this.saltOrRounds = Number(process.env.BCRYPT_SALT_OR_ROUNDS);
  }

  genHash(plain: string): Promise<string> {
    return hash(plain, this.saltOrRounds);
  }

  isEquals(plain: string, hash: string): Promise<boolean> {
    console.log(plain, hash);
    return compare(plain, hash);
  }
}
