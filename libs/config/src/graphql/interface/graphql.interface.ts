import { Request, Response } from 'express';
export interface MyRequest extends Request {
  user: any;
}
export interface GqlCtx {
  req: MyRequest;
  locals: Response['locals'];
}
