import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsNumber } from 'class-validator';

@ObjectType()
export class NotificationModel {
  @Field((type) => Int)
  @IsNumber()
  id: number;
  @Field((type) => Date)
  @IsDate()
  createdAt: Date;
  @Field((type) => Int)
  @IsNumber()
  schoolNewsId: number;
  @Field((type) => Boolean)
  @IsBoolean()
  isReaded: boolean;
}
