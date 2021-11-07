import { Type } from '@nestjs/common';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsOptional, ValidateNested } from 'class-validator';

export function PaginationOutput<T>(classRef: Type<T>): any {
  @ObjectType({ isAbstract: true })
  abstract class U {
    @Field(() => [classRef], { nullable: true })
    @ValidateNested()
    dataList!: T[];

    @Field(() => Int)
    @IsNumber()
    curPage!: number;

    @Field(() => Int)
    @IsNumber()
    totalPage!: number;

    @Field(() => Boolean)
    @IsBoolean()
    hasNextPage!: boolean;
  }
  return U;
}

@InputType()
export class PaginationInputBySkip {
  static readonly DEFAULT_PAGE_NUMBER = 1;
  static readonly DEFAULT_PAGE_SIZE = 10;

  @Field(() => Int, { nullable: true, defaultValue: PaginationInputBySkip.DEFAULT_PAGE_NUMBER })
  @IsNumber()
  @IsOptional()
  pageNumber?: number;

  @Field(() => Int, { nullable: true, defaultValue: PaginationInputBySkip.DEFAULT_PAGE_SIZE })
  @IsNumber()
  @IsOptional()
  pageSize?: number;
}

@InputType()
export class PaginationInputById {
  static readonly DEFAULT_PAGE_SIZE = 10;
  @Field(() => Int)
  @IsNumber()
  lastId!: number;

  @Field(() => Int, { nullable: true, defaultValue: PaginationInputById.DEFAULT_PAGE_SIZE })
  @IsNumber()
  @IsOptional()
  pageSize?: number;
}
