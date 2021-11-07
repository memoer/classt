import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export type IUploadedFiles<T extends string> = Record<T, string[] | undefined>;

export const UploadedFiles = createParamDecorator((_: unknown, context: ExecutionContext) => {
  const { locals } = GqlExecutionContext.create(context).getContext();
  return locals.uploadedFiles;
});
