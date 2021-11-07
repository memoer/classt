import { AwsService } from '@app/config';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  mixin,
  NestInterceptor,
  Type,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { FileUpload } from 'graphql-upload';
import { Observable } from 'rxjs';

export function GqlFileInterceptor(fieldName: string): Type<NestInterceptor> {
  @Injectable()
  class MixinInterceptor implements NestInterceptor {
    // AuthService 에서 해당 Interceptor를 사용하려면, UserModule은 AwsModule 를 import 해야 한다.
    // [ + AwsModule 은 AwsService 를 export 해야 함 ]
    constructor(private readonly awsService: AwsService) {}

    private getFiles(gqlCtx: GqlExecutionContext, location: string[]): FileUpload[] | null {
      let files = gqlCtx.getArgs();
      for (const key of location) {
        files = files[key];
      }
      if (!files) return null;
      return Array.isArray(files) ? files : [files];
    }

    async upload(gqlCtx: GqlExecutionContext, files: FileUpload[]): Promise<void[]> {
      const { uploadedFiles } = gqlCtx.getContext().locals;
      return Promise.all(
        files.map(async (file) => {
          const { mimetype, encoding, createReadStream, filename } = await file;
          const result = await this.awsService.uploadToS3({
            ContentType: mimetype,
            ContentEncoding: encoding,
            Body: createReadStream(),
            Key: `${new Date().valueOf()}_${filename.split('.').slice(0, -1).join('.')}`,
            ACL: 'public-read',
            ContentDisposition: 'inline',
          });
          if (!uploadedFiles[fieldName]) {
            uploadedFiles[fieldName] = [result.Location];
          } else {
            uploadedFiles[fieldName].push(result.Location);
          }
        }),
      );
    }

    async intercept(
      context: ExecutionContext,
      next: CallHandler<unknown>,
    ): Promise<Observable<unknown>> {
      const gqlCtx = GqlExecutionContext.create(context);
      gqlCtx.getContext().locals = { uploadedFiles: {} };
      const location = fieldName.split('.');
      const files = this.getFiles(gqlCtx, location);
      if (files) {
        await this.upload(gqlCtx, files);
      }
      return next.handle();
    }
  }
  return mixin(MixinInterceptor);
}
