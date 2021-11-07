import { Query, Resolver } from '@nestjs/graphql';
import { HelloOuput } from './app.dto';

@Resolver()
export class AppResolver {
  @Query((returns) => HelloOuput, { name: 'hello' })
  test(): HelloOuput {
    return { text: 'hello', date: new Date() };
  }
}
