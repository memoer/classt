import { Injectable } from '@nestjs/common';
import * as aws from 'aws-sdk';

@Injectable()
export class AwsService {
  private readonly s3;

  constructor() {
    aws.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
    this.s3 = new aws.S3();
  }

  async uploadToS3(
    args: Omit<aws.S3.PutObjectRequest, 'Bucket'>,
  ): Promise<aws.S3.ManagedUpload.SendData> {
    const params: aws.S3.PutObjectRequest = {
      Bucket: process.env.AWS_BUCKET,
      ...args,
    };
    return this.s3.upload(params).promise();
  }
}
