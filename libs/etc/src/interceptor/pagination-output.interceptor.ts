import {
  CallHandler,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// 해당 `interceptor`를 사용하는 mutation들은 [object, number]를 리턴해야 한다.
// object -> 데이터의 값들 Record<string,any>[]
// number -> totalCount
@Injectable()
export class PaginationOutputInterceptor<T> implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<{
    dataList: T[];
    totalPage: number;
    curPage: number;
    hasNextPage: boolean;
  }> {
    const gqlContext = GqlExecutionContext.create(context);
    return next.handle().pipe(
      map((data) => {
        const args = gqlContext.getArgs();
        const { pageSize, pageNumber } = args.input.page || args.input;
        if (data.length !== 2) {
          throw new InternalServerErrorException({
            msg: 'data type must be [object, number]',
          });
        } else if (typeof data[0] !== 'object') {
          throw new InternalServerErrorException({
            msg: 'data[0] type must be object',
          });
        } else if (typeof data[1] !== 'number') {
          throw new InternalServerErrorException({
            msg: 'data[1] type must be number',
          });
        }
        const totalPage = Math.ceil(data[1] / pageSize);
        return {
          dataList: data[0],
          totalPage,
          curPage: pageNumber,
          hasNextPage: totalPage !== pageNumber,
        };
      }),
    );
  }
}
