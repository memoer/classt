import { Request, Response } from 'express';
export interface MyRequest extends Request {
  user: { id: number };
}
export interface GqlCtx {
  req: MyRequest;
  locals: Response['locals'];
}
