import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UtilJwt {
  sign(userId: number): string {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET);
  }

  verify(token: string): string | jwt.JwtPayload {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
}
